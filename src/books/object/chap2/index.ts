class Screening {
  constructor(private movie: Movie, private sequence: number, private whenScreened: Date) {}

  public getStartTime() {
    return this.whenScreened;
  }

  public isSequence(sequence: number) {
    return this.sequence === sequence;
  }

  public getMovieFee() {
    return this.movie.getFee();
  }

  public reserve(customer: Customer, audienceCount: number) {
    return new Reservation(customer, this, this.calculateFee(audienceCount), audienceCount);
  }

  private calculateFee(audienceCount: number) {
    return this.movie.calculateMovieFee(this).times(audienceCount);
  }
}

class Money {
  constructor(private readonly amount: number) {}

  public static readonly ZERO = Money.wons(0);

  public static wons(amount: number) {
    return new Money(amount);
  }
  public plus(amount: Money) {
    return new Money(this.amount + amount.amount);
  }
  public minus(amount: Money) {
    return new Money(this.amount - amount.amount);
  }
  public times(percent: number) {
    return new Money(this.amount * percent);
  }
  public isLessThan(other: Money) {
    return this.amount < other.amount;
  }
  public isGreaterThanOrEqual(other: Money) {
    return this.amount >= other.amount;
  }
}

class Reservation {
  constructor(
    private customer: Customer,
    private screening: Screening,
    private fee: Money,
    private audienceCount: number
  ) {}
}

class Movie {
  constructor(
    private titie: string,
    private runningTime: number,
    private fee: Money,
    private discountPolicy: DiscountPolicy
  ) {}

  public getFee() {
    return this.fee;
  }

  public calculateMovieFee(screening: Screening) {
    return this.fee.minus(this.discountPolicy.calculateDiscountAmount(screening));
  }
}

abstract class DiscountPolicy {
  constructor(private conditions: DiscountCondition[]) {}

  public calculateDiscountAmount(screening: Screening) {
    for (const each of this.conditions) {
      if (each.isSatisfiedBy(screening)) {
        return this.getDiscountAmount(screening);
      }
    }

    return Money.ZERO;
  }

  protected abstract getDiscountAmount(screening: Screening): Money;
}

interface DiscountCondition {
  isSatisfiedBy(screening: Screening): boolean;
}

class SequenceCondition implements DiscountCondition {
  constructor(private sequence: number) {}

  public isSatisfiedBy(screening: Screening) {
    return screening.isSequence(this.sequence);
  }
}

class PeriodCondition implements DiscountCondition {
  constructor(private dayOfWeek: number, private startTime: Date, private endTime: Date) {}

  isSatisfiedBy(screening: Screening) {
    return (
      screening.getStartTime().getDay() === this.dayOfWeek &&
      this.startTime <= screening.getStartTime() &&
      this.endTime >= screening.getStartTime()
    );
  }
}

class AmountDiscountPolicy extends DiscountPolicy {
  constructor(private discountAmount: Money, conditions: DiscountCondition[]) {
    super(conditions);
  }

  protected override getDiscountAmount(screening: Screening): Money {
    return this.discountAmount;
  }
}

class PercentDiscountPolicy extends DiscountPolicy {
  constructor(private percent: number, conditions: DiscountCondition[]) {
    super(conditions);
    this.percent = percent;
  }

  protected override getDiscountAmount(screening: Screening): Money {
    return screening.getMovieFee().times(this.percent);
  }
}

class Customer {}
