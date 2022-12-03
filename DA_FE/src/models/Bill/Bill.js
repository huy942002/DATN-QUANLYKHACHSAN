export default class Bill {
    constructor() {
        this.personnel = null;
        this.customer = null;
        this.numberOfAdults = 1;
        this.numberOfKids = 1;
        this.paymentType = {
            id: 1,
            name: 'Tiền mặt',
            status: 0,
        };
        this.hireDate = null;
        this.checkOutDay = null;
        this.dateOfPayment = null;
        this.totalCash = null;
        this.totalCard = null;
        this.deposits = 0;
        this.status = 1;
        this.roomRefundConditions = null;
    }
}
