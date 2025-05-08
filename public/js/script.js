$(document).ready(function () {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    $('a.nav-link').on('click', function (e) {
        if (this.hash !== '') {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 800);
        }
    });

    fetchNumbersApiData();

    setupFileUpload();
});

function fetchNumbersApiData() {
    $.ajax({
        url: 'http://numbersapi.com/1/30/date?json',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#fact-content').html(`
                <div>
                    <h4>On This Day in History:</h4>
                    <p>${data.text}</p>
                    <small>Source: numbersapi.com</small>
                </div>
            `);
        },
        error: function (error) {
            console.error('Error fetching data:', error);
            $('#fact-content').html(`
                <p>Unable to load today's fact. Please try again later.</p>
            `);
        }
    });
}

function setupFileUpload() {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('fileInput');
    const uploadStatus = document.getElementById('upload-status');

    dropArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        dropArea.classList.add('highlight');
    });

    dropArea.addEventListener('dragleave', function (e) {
        e.preventDefault();
        dropArea.classList.remove('highlight');
    });

    dropArea.addEventListener('drop', function (e) {
        e.preventDefault();
        dropArea.classList.remove('highlight');

        if (e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    });

    dropArea.addEventListener('click', function () {
        fileInput.click();
    });

    fileInput.addEventListener('change', function () {
        if (fileInput.files.length > 0) {
            handleFiles(fileInput.files);
        }
    });

    function handleFiles(files) {
        const validFiles = Array.from(files).filter(file =>
            file.type === 'image/jpeg' || file.name.toLowerCase().endsWith('.jpg')
        );

        if (validFiles.length === 0) {
            uploadStatus.innerHTML = '<div class="alert alert-danger">Please select JPG images only.</div>';
            return;
        }

        uploadStatus.innerHTML = '<div class="alert alert-info">Uploading files...</div>';

        const formData = new FormData();
        validFiles.forEach(file => {
            formData.append('files', file);
        });

        $.ajax({
            url: '/upload',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                uploadStatus.innerHTML = '<div class="alert alert-success">Files uploaded successfully!</div>';

                const previewContainer = document.getElementById('preview-container');
                previewContainer.innerHTML = '';

                validFiles.forEach(file => {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.style.width = '100px';
                        img.style.height = '100px';
                        img.style.objectFit = 'cover';
                        img.style.margin = '5px';
                        previewContainer.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                });
                setTimeout(function () {
                    uploadStatus.innerHTML = '';
                }, 3000);
            },
            error: function (error) {
                uploadStatus.innerHTML = '<div class="alert alert-danger">Upload failed. Please try again.</div>';
                console.error('Error:', error);
            }
        });
    }
}