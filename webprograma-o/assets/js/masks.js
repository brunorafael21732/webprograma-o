/* Simple input masks for CPF, phone and CEP */
(function(){
  'use strict';

  function onlyDigits(value){ return value.replace(/\D/g,''); }

  function maskCPF(value){
    const v = onlyDigits(value).slice(0,11);
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, function(_,a,b,c,d){
      return a + (b?'.'+b:'') + (c?'.'+c:'') + (d?'-'+d:'');
    });
  }

  function maskPhone(value){
    const v = onlyDigits(value).slice(0,11);
    if(v.length>10){
      return v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2' + (v.length>6?'-$3':''));
  }

  function maskCEP(value){
    const v = onlyDigits(value).slice(0,8);
    return v.replace(/(\d{5})(\d{0,3})/, function(_,a,b){ return a + (b?'-'+b:''); });
  }

  function attachMask(id, fn){
    const el = document.getElementById(id);
    if(!el) return;
    el.addEventListener('input', function(e){
      const pos = this.selectionStart;
      const before = this.value;
      this.value = fn(this.value);
      // try to keep caret near previous position
      try{ this.setSelectionRange(pos, pos); }catch(err){}
    });
    // remove non-digits before submit
    el.form && el.form.addEventListener('submit', function(){
      el.value = onlyDigits(el.value);
    });
  }

  if(typeof window !== 'undefined'){
    document.addEventListener('DOMContentLoaded', function(){
      attachMask('cpf', maskCPF);
      attachMask('telefone', maskPhone);
      attachMask('cep', maskCEP);
    });
  }

})();
