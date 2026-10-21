import {describe, expect, it, vi} from 'vitest';
import {calculator} from "./calculator"

const skipTest = true;

describe("Vitest Fundamentals", () => {

  it.skipIf(skipTest)("should add two numbers", ()=> {
    const result = calculator.add(2,3);
    expect(result).toBe(5);
  })

  it.skip("should add two numbers V2", ()=> {
    const result = calculator.add(2,3);
    expect(result).toBe(5);
  })

  it("shows how spies work", ()=> {
    const spy = vi.spyOn(calculator,"add");
    const result = calculator.add(2,3);
    expect(result).toBe(5);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(2,3);
  })

  it("shows how mocking works", ()=> {
    const spy = vi.spyOn(calculator,"add").mockReturnValue(5);
    const result = calculator.add(2,3);
    expect(result).toBe(5);
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(2,3);
  })

  it("shows how a pure mock works", ()=> {
    const addMock = vi.fn().mockReturnValue(10);
    const result = addMock(5,5);
    expect(result).toBe(10);
    expect(addMock).toHaveBeenCalledTimes(1)
    expect(addMock).toHaveBeenCalledWith(5,5);
  })


  it("shows how mock clearing works", ()=> {
    const spy = vi.spyOn(calculator,"add")
    const result = calculator.add(2,3);
    expect(result).toBe(5);
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith(2,3);

    spy.mockClear();

    const result2 = calculator.add(5,5);
    expect(result2).toBe(10);
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith(5,5);
  })
});
