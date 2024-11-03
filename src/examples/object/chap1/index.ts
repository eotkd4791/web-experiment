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
  private ticket: Ticket | null = null;

  constructor(private invitation: Invitation | null, private amount: number) {
    this.invitation = invitation;
    this.amount = amount;
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
  constructor(private bag: Bag | null) {}

  public getBag() {
    return this.bag;
  }
}

class TicketOffice {
  constructor(private amount: number, private tickets: Ticket[]) {}

  public getTicket() {
    return this.tickets.shift() || null;
  }

  public minusAmount(amount: number) {
    this.amount -= amount;
  }

  public plusAmount(amount: number) {
    this.amount += amount;
  }
}

class TickerSeller {
  constructor(private ticketOffice: TicketOffice) {}

  public getTicketOffice() {
    return this.ticketOffice;
  }
}

class Theater {
  constructor(private ticketSeller: TickerSeller) {}

  public enter(audience: Audience) {
    if (audience.getBag()?.hasInvitation()) {
      const ticket = this.ticketSeller.getTicketOffice().getTicket();

      audience.getBag()?.setTicket(ticket);
    } else {
      const ticket = this.ticketSeller.getTicketOffice().getTicket();
      if (ticket) {
        audience.getBag()?.minusAmount(ticket.getFee());
        this.ticketSeller.getTicketOffice().plusAmount(ticket.getFee());
        audience.getBag()?.setTicket(ticket);
      }
    }
  }
}
