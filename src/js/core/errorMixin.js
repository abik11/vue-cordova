var ErrorMixin = {
   methods: {
      basicErrorHandler(error) {
         console.error(error);
         if (typeof (error) == 'string')
            this.error = error;
         if (this.loading !== 'undefined')
            this.loading = false;
      }
   }
};
export default ErrorMixin;