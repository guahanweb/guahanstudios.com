function init() {
  let loading = false;
  let fileInput = document.getElementById('filePicker');
  let fileError = document.getElementById('fileError');
  let passwordInput = document.getElementById('password');
  let passwordError = document.getElementById('passwordError');
  let submitInput = document.getElementById('submit');
  let successNotice = document.getElementById('successNotice');
  let uploadError = document.getElementById('uploadError');

  setup();

  function setup() {
    submitInput.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      validateAndSubmit();
    });
  }

  function validateAndSubmit() {
    let isError = false;
    successNotice.classList.add('hidden');
    uploadError.classList.add('hidden');

    const pw   = passwordInput.value || '';
    const file = fileInput.files[0] || null;

    if (!pw) {
      passwordError.classList.remove('hidden');
      isError = true;
    } else {
      passwordError.classList.add('hidden');
    }

    if (!file) {
      fileError.classList.remove('hidden');
      isError = true;
    } else {
      fileError.classList.add('hidden');
    }

    if (!isError) {
      handleUpload({ pw, file });
    }
  }

  function setProcessing() {
    loading = true;
    submitInput.disabled = true;
    submitInput.innerText = 'Processing...'
  }

  function doneProcessing() {
    loading = false;
    submitInput.innerText = 'Upload';
    submitInput.disabled = false;
  }

  function handleUpload(data) {
    setProcessing();
    const formData = new FormData();
    formData.append('file', data.file);
    fetch('', {
        method: 'POST',
        headers: {
          authorization: `BEARER ${btoa(data.pw)}`
        },
        body: formData
      })
      .then(response => response.json())
      .then(json => {
        // assume success
        successNotice.classList.remove('hidden');
      })
      .catch(err => {
        uploadError.classList.remove('hidden');
      })
      .finally(() => {
        doneProcessing();
      });
  }
}

init();