<?php

class SSORule {

  private string $rule;

  private static array $supportedOperators = [
    "==",
    "contains",
  ];

  private static array $supportedFields = [
    "mail",
    "department",
    "jobTitle",
    "companyName",
    "sourceAD",
    "extensionAttribute1",
    "extensionAttribute2",
    "extensionAttribute5",
    "extensionAttribute7",
  ];

  private static array $supportedSubstitutions = [
    "displayName", "surname", "givenName"
  ];

  /**
   * @param string $rule
   */
  public function __construct(string $rule) {
    $this->rule = trim($rule);
  }


  public function isValid(): bool {
    if(strlen($this->rule) === 0) {
      return true;
    }

    if($this->isSubstitutionRule()) {
      $split = preg_split('/[{}]/', $this->rule);
      foreach ($split as $i => $s) {
        if($i % 2) { // check indexes 1,3,5... eg [test{x}{sn}] is split "[test","x","","sn","]"
          if (!in_array($s, self::$supportedSubstitutions)) {
            return FALSE;
          }
        }
      }
      return true;
    }

    $NotToken = "not ";

    $andParts = explode(" and ", $this->rule);

    foreach ($andParts as $andPart) {
      $not = str_starts_with($andPart, $NotToken);
      if ($not) {
        $andPart = substr($andPart, strlen($NotToken));
      }
      [$field, $operator, $value] = explode(" ", $andPart);

      if (!in_array($field, self::$supportedFields)) {
        return FALSE;
      }
      if (!in_array($operator, self::$supportedOperators)) {
        return FALSE;
      }
    }
    return TRUE;
  }

  public function getError(): string {
    if(strlen($this->rule[0]) == 0) {
      return true;
    }

    if($this->rule[0] === '[') {
      $split = preg_split('/[{}]/', $this->rule);
      $supportedList = SSORule::getSupportedSubstitutionsList();
      foreach ($split as $i => $s) {
        if($i % 2) { // check indexes 1,3,5... eg [test{x}{sn}] is split "[test","x","","sn","]"
          if (!in_array($s, self::$supportedSubstitutions)) {
            return "substitution \"$s\" not supported use ($supportedList)";
          }
        }
      }
      return "";
    }

    $NotToken = "not ";

    $andParts = explode(" and ", $this->rule);

    foreach ($andParts as $andPart) {
      $not = str_starts_with($andPart, $NotToken);
      if ($not) {
        $andPart = substr($andPart, strlen($NotToken));
      }
      [$field, $operator, $value] = explode(" ", $andPart);

      if (!in_array($field, self::$supportedFields)) {
        $supportedList = SSORule::getSupportedFieldList();
        return "field \"$field\" not supported use ($supportedList)";

      }
      if (!in_array($operator, self::$supportedOperators)) {
        $supportedList = SSORule::getSupportedOperatorList();
        return "operator \"$operator\" not supported use ($supportedList)";
      }
    }
    return "";
  }

  public static function getSupportedOperatorList(): string {
    return implode(", ", self::$supportedOperators);

  }

  public static function getSupportedFieldList(): string {
    return implode(", ", self::$supportedFields);
  }

  public static function getSupportedSubstitutionsList(): string {
    return implode(", ", self::$supportedSubstitutions);
  }

  public function isMatch(array $data): bool {
    if(strlen($this->rule) == 0) {
      return false;
    }
    $NotToken = "not ";

    $andParts = explode(" and ", $this->rule);

    $matches = 0;

    foreach ($andParts as $andPart) {
      $not = str_starts_with($andPart, $NotToken);
      if ($not) {
        $andPart = substr($andPart, strlen($NotToken));
      }
      [$field, $operator, $value] = explode(" ", $andPart, 3);

      $value = strtolower(trim($value, " \""));
      $dataValue = strtolower($data[$field] ?? "");

      switch ($operator) {
        case "==":
          if ($not) {
            $matches += $dataValue != $value ? 1 : 0;
          }
          else {
            $matches += $dataValue == $value ? 1 : 0;
          }
          break;
        case "contains":
          if ($not) {
            $matches += !(str_contains($dataValue, $value)) ? 1 : 0;
          }
          else {
            $matches += str_contains($dataValue, $value) ? 1 : 0;
          }
          break;
      }
    }
    return $matches == count($andParts);
  }

  /**
   * @return bool
   */
  public function isSubstitutionRule(): bool {
    return strlen($this->rule) > 0 && $this->rule[0] === '[';
  }

  /**
   * @throws \Exception
   */
  public function substitution(array $data): string {
    if($this->isSubstitutionRule()) {
      $str = trim($this->rule, '[] ');
      foreach (self::$supportedSubstitutions as $sub) {
        $value = $data[$sub] ?? "";
        $str = str_replace('{'.$sub.'}', $value, $str);
      }
      return $str;
    }
    throw new \Exception("Can only substitute on Substitution Rules");
  }
}