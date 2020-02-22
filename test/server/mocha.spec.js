import sinon from "sinon";
describe("Sinon library", () => {
  it("fakes normally", async () => {
    const fn = sinon.fake.returns(123);
    expect(fn()).to.equal(123);

    const fn1 = sinon.fake.throws(new Error());
    expect(fn1).to.throw();

    const fn2 = sinon.fake.resolves(123);
    await fn2().then(ret => expect(ret).to.equal(123));

    const fn3 = sinon.fake.rejects(new Error());
    await fn3().catch(e => expect(e).to.exist);

    const fn4 = sinon.fake(() => 123);
    expect(fn4()).to.equal(123);
  });
  it("spies normally", () => {
    const fn = num => num;
    const spy = sinon.spy(fn);
    console.log(spy(123));
    expect(spy.called).be.true;
    const obj = {
      fn: (num, s) => num
    };
    const spy2 = sinon.spy(obj.fn);
    spy2(123, "hello");
    expect(spy2.calledOnce).be.true;
    expect(spy2.getCall(0).args[0]).to.equal(123);
  });
  it("stubs normally", () => {
    class Obj {
      fn(num) {
        return num;
      }
    }
    sinon.stub(Obj.prototype, "fn").callsFake(() => "hello");
    const obj = new Obj();
    expect(obj.fn()).to.equal("hello");
  });
  it("mocks normally", () => {
    const obj = {
      fn: num => num,
      fn1: () => {
        throw new Error();
      }
    };
    const mock1 = sinon.mock(obj);
    mock1.expects("fn1").throws();
    mock1.expects("fn").returns();
    obj.fn(123);
    try {
      obj.fn1();
    } catch (e) {
      expect(e).to.exist;
    }
    mock1.verify();
  });
});
describe("Mocha Test", () => {
  let syncFnError, asyncFnError;
  before(() => {
    syncFnError = new Error("syncFn failed");
    asyncFnError = new Error("asyncFn failed");
    // runs before all tests in this block
  });

  after(() => {
    // runs after all tests in this block
  });

  beforeEach(() => {
    // runs before each test in this block
  });

  afterEach(() => {
    // runs after each test in this block
  });

  it("should calculate the correct answer", () => {
    expect(1 + 1).to.equal(2);
  });

  const syncFn = () => {
    throw syncFnError;
  };

  const asyncFn = async () => {
    throw asyncFnError;
  };

  it("should throw error in sync fn", () => {
    expect(syncFn).to.throw();
  });

  it("should throw error in async fn", async () => {
    return await asyncFn().catch(e => {
      expect(e).to.equal(asyncFnError);
      expect(e).to.exist;
      expect({}).to.be.empty;
      expect({ a: 123 }).to.not.be.empty;
      expect({}).to.be.an("object");
      expect(() => {}).to.be.a("function");
    });
  });
});
