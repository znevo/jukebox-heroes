const Swal = require('sweetalert2');

// this.$flash.msg('Your transaction has been submitted and is awaiting confirmation!', 'info', true, 20000);
// this.$flash.msg('Your NFT has been launched and added to the jukebox!');

class Flash {
  msg(msg, status = 'success', isLoading = false, timer = 5000) {
    Swal.fire({
      customClass: {
        popup: 'colored-toast'
      },
      iconColor: 'white',
      showConfirmButton: false,
      timerProgressBar: true,
      position: 'top-end',
      toast: true,
      timer: timer,
      icon: status,
      title: msg,
      text: null,
      didOpen: () => {
        if ( isLoading ) {
          Swal.showLoading();
        }
      }
    });
  }

  error(msg) {
    this.msg(msg, 'error');
  }

  wait(msg, wait = 60000) {
    this.msg(msg, 'info', true, wait);
  }
}

export default Flash;
