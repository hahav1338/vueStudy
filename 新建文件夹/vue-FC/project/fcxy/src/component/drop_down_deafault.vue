<template>
    <div role="presentation" class="x-form-item-body x-form-trigger-wrap-focus" id="ext-comp-1033-bodyEl" style="width: 100%;">
  <table id="ext-comp-1033-triggerWrap" class="x-form-trigger-wrap"  style="width: 100%; table-layout: fixed;">
  <tbody>
  <tr>
  <td id="ext-comp-1033-inputCell" class="x-form-trigger-input-cell" style="width: 100%;">
  <div class="x-hide-display x-form-data-hidden" role="presentation" id="ext-gen1089"></div>
  <input id="ext-comp-1033-inputEl" type="text" class="x-form-field x-form-text  x-trigger-noedit x-form-focus x-field-form-focus x-field-default-form-focus" autocomplete="off" name="ext-comp-1033-inputEl" readonly="readonly" aria-invalid="false" data-errorqtip="" style="width: 100%; padding-right: 6px;">
  </td>
  <td valign="top" class=" x-trigger-cell x-unselectable" style="width:22px;" id="ext-gen1088">
  <div class="x-trigger-index-0 x-form-trigger x-form-arrow-trigger x-form-trigger-first" role="button" id="ext-gen1087"></div>
  </td>
  </tr>
  </tbody>
  </table>
  <div class="ext-ux-clearbutton ext-ux-clearbutton-off" id="ext-gen1090" style="right: 28px; top: 2px; background-color: rgb(255, 255, 255);"></div>
  </div>
</template>
<script type="text/javascript">
export default {
     name: 'drop_down_deafault',
      data () {
        return {
          author: "微信公众号 jinkey-love"
        }
      }
}
</script>
<style>
    .x-form-item-body {
      position: relative;
    }

    .x-form-trigger-wrap .x-form-text{
    	line-height:32px;
    	height:32px;
    	  vertical-align: top;
          border-collapse: separate;
           border: 1px solid;
            border-color: silver #d9d9d9 #d9d9d9;

    }
    .x-form-trigger-input-cell {
      height: 24px;
    }
    .x-trigger-cell {
      background-color: white;
      width: 22px;
    }
    .ext-ux-clearbutton {
         width: 12px;
         height: 12px;
         background-image: url(../assets/clear-text-icon.gif);
         background-position: 0 0;
         background-repeat: no-repeat;
         -moz-user-focus: ignore; /* https://developer.mozilla.org/en/CSS/-moz-user-focus */
         cursor: pointer;
         position: absolute;
         overflow:  hidden; /* IE 6 :-( */
         margin-top: 4px;
         background-color: white;
     }
     .ext-ux-clearbutton-off {
         opacity: 0;
         visibility: hidden;
         transition: opacity .35s linear, visibility .0s linear .35s;
         -webkit-transition: opacity .35s linear, visibility .0s linear .35s;
         -moz-transition: opacity .35s linear, visibility .0s linear .35s;
         -o-transition: opacity .35s linear, visibility .0s linear .35s;
         -ms-transition: opacity .35s linear, visibility .0s linear .35s;
         -khtml-transition: opacity .35s linear, visibility .0s linear .35s;
     }
    .x-unselectable {
    	user-select: none;
    	-o-user-select: none;
    	-ms-user-select: none;
    	-moz-user-select: -moz-none;
    	-webkit-user-select: none;
    	cursor: default
    }
    .x-form-field {
      color: black;
       font: normal 13px helvetica, arial, verdana, sans-serif;
       filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=30);
       opacity: 0.3;
    }
    .x-form-text{
    	line-height:32px;
    	height:34px;
    }
    .x-form-focus {
      border-color: #3892d3;
    }

</style>