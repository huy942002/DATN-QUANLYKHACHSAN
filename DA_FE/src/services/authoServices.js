import jwt_decode from 'jwt-decode';

let token =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cnVjbnYiLCJleHAiOjE2NzAwNTI2MDEsImlhdCI6MTY3MDAzNDYwMX0.86ijDCQMb7VTCq1JcODvHmIchMnAwmg19ML1ReDbxtwCZh5j64MIHeZn4Mrpbv7qYMfvasdFqG9F0omRGVm1iQ';
if (window.localStorage.getItem('token')) {
    token = window.localStorage.getItem('token');
}

const currentUser = jwt_decode(token).sub;

export default { currentUser };
