/* eslint-disable @typescript-eslint/no-unused-vars */

class Invitation {
  private when: Date | null = null;
}

class Ticket {
  private fee: number = 0;

  public getFee() {
    return this.fee;
  }
}

class Bag {
  constructor(private invitation: Invitation | null, private amount: number, private ticket: Ticket | null) {
    this.invitation = invitation;
    this.amount = amount;
    this.ticket = null;
  }

  public hold(ticket: Ticket) {
    if (this.hasInvitation()) {
      this.setTicket(ticket);
      return 0;
    } else {
      this.setTicket(ticket);
      this.minusAmount(ticket.getFee());
      return ticket.getFee();
    }
  }

  public hasInvitation() {
    return this.invitation !== null;
  }

  public hasTicket() {
    return this.ticket !== null;
  }

  public setTicket(ticket: Ticket | null) {
    this.ticket = ticket;
  }

  public minusAmount(amount: number) {
    this.amount -= amount;
  }

  public plusAmount(amount: number) {
    this.amount += amount;
  }
}

class Audience {
  constructor(private bag: Bag) {}

  public buy(ticket: Ticket | null) {
    if (ticket === null) return 0;
    return this.bag.hold(ticket);
  }
}

class TicketOffice {
  constructor(private amount: number, private tickets: Ticket[]) {}

  public sellTicketTo(audience: Audience) {
    this.plusAmount(audience.buy(this.getTicket()));
  }

  public getTicket() {
    return this.tickets.shift() as Ticket;
  }

  public minusAmount(amount: number) {
    this.amount -= amount;
  }

  public plusAmount(amount: number) {
    this.amount += amount;
  }
}

class TicketSeller {
  constructor(private ticketOffice: TicketOffice) {}

  public sellTo(audience: Audience) {
    this.ticketOffice.sellTicketTo(audience);
  }
}

class Theater {
  constructor(private ticketSeller: TicketSeller) {}

  public enter(audience: Audience) {
    this.ticketSeller.sellTo(audience);
  }
}
