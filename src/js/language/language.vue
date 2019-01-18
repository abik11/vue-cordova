<template>
   <div class="lang">
      <img v-for="lang in languages"
           :class="{ unactive: !lang.active }"
           :src="lang.img"
           @click="changeLanguage(lang.lang)" />
   </div>
</template>

<script>
   export default {
      name: 'language',
      data() {
         return {
            languages: [
               { lang: 'en', active: true, img: 'file:///android_asset/www/img/United-Kingdom-icon.png' },
               { lang: 'pl', active: false, img: 'file:///android_asset/www/img/Poland-icon.png' },
               { lang: 'es', active: false, img: 'file:///android_asset/www/img/Spain-icon.png' },
               { lang: 'it', active: false, img: 'file:///android_asset/www/img/Italy-icon.png' },
            ]
         }
      },
      methods: {
         changeLanguage(lang) {
            this.$i18n.locale = lang;
            localStorage.lang = lang;

            //Mark languages as unactive or active
            _.forEach(this.languages, function (langTmp) {
               if (langTmp.lang !== lang)
                  langTmp.active = false;
               else
                  langTmp.active = true;
            });
         }
      },
      mounted() {
         var lang = this.$i18n.locale;
         if (localStorage.lang) {
            lang = localStorage.lang;
         }
         this.changeLanguage(lang);
      }
   }
</script>

<style lang="scss" scoped>
   .unactive {
      opacity: 0.4;
   }

   img {
      max-height: 32px;
      margin-left: 4px;
      margin-right: 4px;
   }
</style>