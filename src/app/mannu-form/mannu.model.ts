export class Mannu {
    id?: string;
    expiredClass?: string;
    constructor(
        public expiryDate: Date,
        public mannuName: string,
        public tabletsRemaining: number,
        public profile: String
    ) { }
}
