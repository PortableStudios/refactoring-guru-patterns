import { BeverageSize } from '../enums/BeverageSize';
import { BeverageType } from '../enums/BeverageType';
import { MilkType } from '../enums/MilkType';
import { BrewTeam3000, MILLILITRES, notifyBrewTeamSupport, NOW, TEASPOON, WHIPPED_CREAM } from '../lib/BrewTeam/BrewTeam';
import { BrewTeamError } from '../lib/BrewTeam/exceptions/BrewTeamError';
import { EspressMagix } from '../lib/EspressMagix/EspressMagix';
import { GreenTeaService } from '../lib/GreenTeaService/GreenTeaService';
import { getSocket, getTcpConnection, makeBuffer } from '../lib/TeaCP';
import { Order } from '../types/Order';
import { OrderFullfilled } from '../types/OrderFulfilled';
import { OrderRejected } from '../types/OrderRejected';

/**
 * We need one abstract classes and one or more concrete implementations of it.
 * The files which we control are in:
 * - enums
 * - types
 * - handlers
 *
 * The lib folder basically contains the vendor files and we don't own them and (in theory) cant change it. Only look
 * in there if you want to ruin the illusion.
 */
export class OrderHandler {
    async handle(order: Order): Promise<OrderFullfilled | OrderRejected> {
        switch (order.type) {
            case BeverageType.COFFEE:
            case BeverageType.LATTE:
                try {
                    const brewTeam3000 = BrewTeam3000.getInstance();
                    brewTeam3000.useDefaults();
                    brewTeam3000.setSize(order.size);
                    brewTeam3000.setType(order.type);

                    brewTeam3000.setMilkType(order.customisation.milk);
                    brewTeam3000.setMilkUnits(MILLILITRES);

                    if (order.customisation.milk !== MilkType.NONE) {
                        switch (order.size) {
                            case BeverageSize.SMALL:
                                brewTeam3000.setMilkAmount(50);
                                break;
                            case BeverageSize.MEDIUM:
                                brewTeam3000.setMilkAmount(100);
                                break;
                            case BeverageSize.LARGE:
                                brewTeam3000.setMilkAmount(200);
                                break;
                            case BeverageSize.MEGA:
                                brewTeam3000.setMilkAmount(300);
                                break;
                            default:
                                return new OrderRejected(order, 'BrewTeam: Unknown beverage size. Allowed milk volume indeterminate');
                        }
                    }

                    if (order.customisation.sugar !== 0) {
                        brewTeam3000.setSugarUnits(TEASPOON);
                        // tsp is ~ 15mg. its a magic number
                        brewTeam3000.setSugarAmount(order.customisation.sugar * 15);
                    }

                    if (order.customisation.whippedCream) {
                        brewTeam3000.addExtras(WHIPPED_CREAM);
                    }

                    await brewTeam3000.brew();
                    brewTeam3000.updateCleaningSchedule(NOW);
                    await brewTeam3000.updateLoyalty(order.customer);

                    return new OrderFullfilled(order);
                } catch (error) {
                    if (error instanceof BrewTeamError) {
                        notifyBrewTeamSupport(error);
                    }

                    return new OrderRejected(order, `BrewTeam: ${error.message}`);
                }
            case BeverageType.ESPRESSO:
                const espressMagix = new EspressMagix();

                try {
                    await espressMagix
                        .single()
                        .roast()
                        .standard()
                        .make();

                    return new OrderFullfilled(order);
                } catch (error) {
                    return new OrderRejected(order, `EspressMagix: ${error.message}`);
                }
            case BeverageType.GREEN_TEA:
                try {
                    const greenTeaService = new GreenTeaService();
                    greenTeaService.make(order);

                    return new OrderFullfilled(order);
                } catch (error) {
                    return new OrderRejected(order, `EspressMagix: ${error.message}`);
                }
            case BeverageType.TEA:
                const connection = getTcpConnection();

                if (connection === false) {
                    return new OrderRejected(order, 'TeaCP: Cant make a connection');
                }

                const socket = getSocket(connection);
                const buffer = makeBuffer(connection);

                buffer.write(`TEACP size ${order.size};`);

                if (order.customisation.milk !== MilkType.NONE) {
                    switch (order.size) {
                        case BeverageSize.SMALL:
                            buffer.write(`TEACP milk ml 50`);
                            break;
                        case BeverageSize.MEDIUM:
                            buffer.write(`TEACP milk ml 100`);
                            break;
                        case BeverageSize.LARGE:
                            buffer.write(`TEACP milk ml 200`);
                            break;
                        case BeverageSize.MEGA:
                            buffer.write(`TEACP milk ml 300`);
                            break;
                        default:
                            return new OrderRejected(order, 'TEACP: Unknown beverage size. Allowed milk volume indeterminate');
                    }
                }

                if (order.customisation.sugar !== 0) {
                    buffer.write(`TEACP sugar tsp ${order.customisation.sugar}`);
                }

                const success = socket.write(buffer);

                if (success === -1) {
                    return new OrderRejected(order, 'TeaCP: Cant write the buffer');
                }

                return new OrderFullfilled(order);
            default:
                return new OrderRejected(order, "Unexpected beverage type in the beverage area.");
        }
    }
}
