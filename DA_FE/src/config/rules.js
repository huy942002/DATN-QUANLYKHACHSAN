const validateMessages = {
    required: 'Vui lòng nhập ${label}!',
    types: {
      email: '${label} không đúng định dạng!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
    phoneNumber: {
        validator: (_, value) => {
            console.log(_);
            if(value) {
                if(/(0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)) {
                    return Promise.resolve();
                }
                return Promise.reject(_.field + ' chưa đúng!');
            }
            return Promise.resolve();
        }
    },
    space: {
        validator: (_, value) => {
            if(value) {
                if(value.trim()) {
                    return Promise.resolve();
                }
                return Promise.reject(_.field + ' không được để trống!');
            }
            return Promise.resolve();
        }
    },
    specialCharacters: {
        validator: (_, value) => {
            if(value) {
                if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)) {
                    return Promise.reject(_.field + ' không được có ký tự đặc biệt!');
                }
                return Promise.resolve();
            }
            return Promise.resolve();
        }
    }
};

export default validateMessages;