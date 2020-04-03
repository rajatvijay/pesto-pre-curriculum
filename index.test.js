const { add, subtract, divide, multiply } = require("./index");
const { describe, it, expect } = require("./testingLib");

describe("add", () => {
  it("should return correct sum for the two input numbers", () => {
    const result = add(1, 5);
    expect(result).toBe(6);
  });

  it("should return correct difference for the two input numbers", () => {
    const result = subtract(5, 1);
    expect(result).toBe(4);
  });

  it("should return correct quotient for the two input numbers", () => {
    const result = divide(10, 5);
    expect(result).toBe(2);
  });

  it("should return correct product for the two input numbers", () => {
    const result = multiply(4, 7);
    expect(result).toBe(28);
  });
});
