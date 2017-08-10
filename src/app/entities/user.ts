
/**
 * Class for managing Accounts/ Logins
 */
class User {

    private _name : string = 'Name';
    private _email : string = 'email@email.com';
    private _password : string = '';
    private _data : any;

    constructor(params: any) {
        //TODO: Generate user form req header and verify with gitlab api
    }


    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get data(): any {
        return this._data;
    }

    set data(value: any) {
        this._data = value;
    }
}

export = User;
