import ErrorMixin from './errorMixin.js';

const ErrorToastMixin = {
   mixins: [ErrorMixin],
   data() {
      return {
         errorToast: false,
         errorToastTimeout: 8000,
         errorTimeoutHandler: null
      };
   },
   watch: {
      error(newError) {
         if (newError != '') {
            this.errorToast = true;
            this.errorTimeoutHandler = setTimeout
               (() => this.error = '', this.errorToastTimeout);
         }
      }
   },
   methods: {
      clearError() {
         clearTimeout(this.errorTimeoutHandler);
         this.errorToast = false;
         this.error = '';
      }
   }
};
export default ErrorToastMixin;