export interface AuthData {
    data: Data;
}

export interface Data {
    user:    User;
    payload: Payload;
}

export interface Payload {
    type:          string;
    token:         string;
    refresh_token: string;
}

export interface User {
    email:     string;
    firstName: string;
    lastName:  string;
}
