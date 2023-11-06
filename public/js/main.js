document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const totalHarga = document.getElementById('totalHarga');

    // Daftar alat
    const alatCounters = document.querySelectorAll('.jumlah');
    const plusButtons = document.querySelectorAll('.plus');
    const minusButtons = document.querySelectorAll('.min');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            updateSubtotal();
        });
    });

    plusButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            incrementCount(index);
        });
    });

    minusButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            decrementCount(index);
        });
    });

    function updateSubtotal() {
        var subtotal = 0;
        checkboxes.forEach(function (checkbox, index) {
            if (checkbox.checked) {
                const harga = parseFloat(checkbox.getAttribute('data-harga'));
                if (!isNaN(harga)) {
                    const count = parseInt(alatCounters[index].querySelector('.count').textContent, 10);
                    subtotal += harga * count;
                }
            }
        });
        subtotalElement.textContent = 'Rp. ' + subtotal.toFixed(0);
        updateTotal(subtotal);
    }

    function updateTotal(subtotal) {
        const total = subtotal;
        totalElement.textContent = 'Rp. ' + total.toFixed(0);
        totalHarga.textContent = 'Rp. ' + total.toFixed(0);
    }

    function incrementCount(index) {
        const jumlah = alatCounters[index].querySelector('.count');
        let count = parseInt(jumlah.textContent, 10);
        count++;
        jumlah.textContent = count;

        // Update the input value
        const inputJumlah = alatCounters[index].querySelector('input[type="hidden"]');
        inputJumlah.value = count;
        // console.log(inputJumlah);

        updateSubtotal();
    }

    function decrementCount(index) {
        const jumlah = alatCounters[index].querySelector('.count');
        let count = parseInt(jumlah.textContent, 10);
        if (count > 0) {
            count--;
            jumlah.textContent = count;

            // Update the input value
            const inputJumlah = alatCounters[index].querySelector('input[type="hidden"]');
            inputJumlah.value = count;

            updateSubtotal();
        }
    }

    // updateSubtotal();
});


// disable








