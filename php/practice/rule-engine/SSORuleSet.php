<?php

class SSORuleSet {

  /**
   * @var SSORule[]
   */
  private array $rules;

  /**
   * @param string $rules
   */
  public function __construct(string $rules) {
    $this->rules = [];
    foreach (explode("\n", $rules) as $rule) {
      $this->rules[] = new SSORule($rule);
    }
  }

  public function isValid(): bool {
    foreach ($this->rules as $rule) {
      /** @var SSORule $rule */
      if(!$rule->isValid()) {
        return false;
      }
    }
    return true;
  }

  public function isMatch(array $data): bool {
    foreach ($this->rules as $rule) {
      /** @var SSORule $rule */
      if($rule->isMatch($data)) {
        return true;
      }
    }
    return false;
  }

  public function getErrors(): string {
    $errors = [];
    foreach ($this->rules as $rule) {
      /** @var SSORule $rule */
      if(!$rule->isValid()) {
        return $errors[] = $rule->getError();
      }
    }
    return implode(", ", $errors);
  }

  /**
   * @throws \Exception
   */
  public function getName(array $data) {
    $activeSub = NULL;
    foreach ($this->rules as $rule) {
      /** @var SSORule $rule */
      if($rule->isSubstitutionRule()) {
        $activeSub = $rule;
      } else {
        if($rule->isMatch($data) && $activeSub !== NULL) {
          return $activeSub->substitution($data);
        }
      }
    }
    return "";
  }


}