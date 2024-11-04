
class OTPService {
    static generateOTP() {
        let digitRange = 9;
        let OTP_LENGTH = 6;
        let otpArray = [];

        //populate otpArray with random values form 0 through 9(inclusive)
        for (let i = 0; i < OTP_LENGTH; ++i) {
            otpArray.push(Math.floor(Math.random() * (digitRange + 1)));
        }

        //we shuffle the array to increase randomness.
        const OTP_NUM_ARRAY = OTPService.shuffle(otpArray);
        let OTP = "";

        OTP_NUM_ARRAY.forEach((digit) => {
            //convert each of the number in the array to string
            OTP += String(digit);
        });

        return parseInt(OTP, 10);
    }

    static shuffle(digitArr) {
        let N = digitArr.length;

        for (let i = 0; i < N; ++i) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            OTPService.swap(digitArr, randomIndex, i);
        }

        return digitArr;
    }

    static swap(arr, idx1, idx2) {
        const temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }
}

export default OTPService;
