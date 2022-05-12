<?php

include "./SSORule.php";
include "./SSORuleSet.php";

use PHPUnit\Framework\TestCase;

class SSORuleTest extends TestCase {

  public function testIsValid() {
    // Exact match
    self::assertTrue((new SSORule("department == \"string\""))->isValid());
    self::assertFalse((new SSORule("field == \"string\""))->isValid()); // Unsupported field

    // and
    self::assertTrue((new SSORule("department == \"string\" and jobTitle == \"string\""))->isValid());
    self::assertFalse((new SSORule("department == \"string\" and badfield == \"string\""))->isValid());

    // contains
    self::assertTrue((new SSORule("department contains \"string\""))->isValid());
    self::assertFalse((new SSORule("department like \"string\""))->isValid());

    // not
    self::assertTrue((new SSORule("not department contains \"string\""))->isValid());
    self::assertFalse((new SSORule("department not == \"string\""))->isValid());

    // name rule
    self::assertTrue((new SSORule("[Magistrate {surname}]"))->isValid());
    self::assertFalse((new SSORule("[Magistrate {first}]"))->isValid());

    self::assertTrue((new SSORule(""))->isValid());

  }

  public function testGetError() {
    $supportedList = SSORule::getSupportedFieldList();
    self::assertEquals("field \"field\" not supported use ($supportedList)",
      (new SSORule("field == \"string\""))->getError());
    self::assertEquals("field \"badfield\" not supported use ($supportedList)",
      (new SSORule("department == \"string\" and badfield == \"string\""))->getError());

    $supportedOperatorList = SSORule::getSupportedOperatorList();
    self::assertEquals("operator \"like\" not supported use ($supportedOperatorList)",
      (new SSORule("department like \"string\""))->getError());

    $supportedSubList = SSORule::getSupportedSubstitutionsList();
    self::assertEquals("substitution \"first\" not supported use ($supportedSubList)", (new SSORule("[Magistrate {first}]"))->getError());

  }

  public function testIsMatch() {
    self::assertTrue((new SSORule("department == \"string\""))->isMatch(["department" => "string"]));
    self::assertFalse((new SSORule("department == \"string\""))->isMatch(["department" => "strings"]));
    self::assertTrue((new SSORule("department contains \"string\""))->isMatch(["department" => "strings"]));
    self::assertFalse((new SSORule("not department contains \"string\""))->isMatch(["department" => "strings"]));
    self::assertTrue((new SSORule("not department == \"string\""))->isMatch(["department" => "strings"]));

    self::assertTrue((new SSORule("department == \"string\" and title == \"mag\""))->isMatch(["department" => "string", "title" => "mag"]));
    self::assertFalse((new SSORule("department == \"string\" and title == \"mag\""))->isMatch(["department" => "strings", "title" => "sir"]));
    self::assertTrue((new SSORule("department == \"string\" and not title == \"mag\""))->isMatch(["department" => "string", "title" => "sir"]));
  }

  public function testName() {
    $userinfo = array (
      'sub' => '2hBYIuWONBM1XIXfWQXXz9dcGrx9HXvybBKAZB0h0aY',
      'name' => 'jason',
      'picture' => 'https://graph.microsoft.com/v1.0/me/photo/$value',
      'email' => 'jason@portable.com.au',
      'sourceAD' => 'portable',
      'displayName' => 'jason',
      'givenName' => NULL,
      'surname' => NULL,
      'mail' => 'jason@portable.com.au',
      'jobTitle' => NULL,
      'department' => NULL,
      'companyName' => NULL,
      'extensionAttribute1' => NULL,
      'extensionAttribute2' => NULL,
      'extensionAttribute3' => NULL,
      'extensionAttribute4' => NULL,
      'extensionAttribute5' => NULL,
      'extensionAttribute6' => NULL,
      'extensionAttribute7' => NULL,
      'extensionAttribute8' => NULL,
      'extensionAttribute9' => NULL,
      'extensionAttribute10' => NULL,
      'extensionAttribute11' => NULL,
      'extensionAttribute12' => NULL,
      'extensionAttribute13' => NULL,
      'extensionAttribute14' => NULL,
      'extensionAttribute15' => NULL,
    );
    self::assertTrue((new SSORule("sourceAD == \"portable\""))->isMatch($userinfo));

     self::assertEquals("jason the Portablian", (new SSORuleSet("[{displayName} the Portablian]\nsourceAD == \"portable\""))->getName($userinfo));
  }


}
