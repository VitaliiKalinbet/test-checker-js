"use strict";

class TaskCheckResult {
  constructor() {
    this.checkSuccess = true;
    this.checkMessage = "";

    this.successConditions = [];
    this.failedConditions = [];
  }

  failed(condition) {
    this.removeCondition(condition);
    this.failedConditions.push(condition);
  }

  success(condition) {
    this.removeCondition(condition);
    this.successConditions.push(condition);
  }

  removeCondition(condition) {
    var successIndex = this.successConditions.indexOf(condition);
    if (successIndex > -1) {
      this.successConditions.splice(successIndex, 1);
    }

    var failedIndex = this.failedConditions.indexOf(condition);
    if (failedIndex > -1) {
      this.failedConditions.splice(failedIndex, 1);
    }
  }
}

exports.TaskCheckResult = TaskCheckResult;
