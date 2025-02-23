document.addEventListener("DOMContentLoaded", function () {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");
    const addButton = document.querySelector(".btn");

    if (!inputBox || !listContainer || !addButton) {
        console.error("Elemen tidak ditemukan! Periksa kembali ID dan class di HTML.");
        return;
    }

    function addTask() {
        let inputValue = inputBox.value.trim();
    
        if (inputValue.length === 0) {
            Swal.fire({
                title: "Oops...",
                text: "Kamu harus menulis sesuatu!",
                icon: "warning",
                color: "#000000",
                confirmButtonColor: "#000080",
                customClass: {
                    popup: "custom-swal",
                },
            });
            return;
        }
    
        let li = document.createElement("li");
    
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");
    
        let taskText = document.createElement("span");
        taskText.textContent = inputValue;
        taskText.classList.add("task-text");
    
        let span = document.createElement("span");
        span.classList.add("delete-btn");
    
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(span);
    
        listContainer.appendChild(li);
        inputBox.value = "";
    
        saveData();
    }

    function saveData() {
        let tasks = [];
        document.querySelectorAll("#list-container li").forEach(li => {
            tasks.push({
                text: li.querySelector(".task-text").textContent,
                checked: li.querySelector(".task-checkbox").checked
            });
        });
        localStorage.setItem("data", JSON.stringify(tasks));
    }

    function showTask() {
        listContainer.innerHTML = "";
        let savedTasks = JSON.parse(localStorage.getItem("data")) || [];

        savedTasks.forEach(task => {
            let li = document.createElement("li");

            // Buat checkbox
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("task-checkbox");
            checkbox.checked = task.checked;

            // Buat teks tugas
            let taskText = document.createElement("span");
            taskText.textContent = task.text;
            taskText.classList.add("task-text");

            // Buat tombol hapus
            let span = document.createElement("span");
            span.classList.add("delete-btn");

            // Jika tugas sudah dicentang, tambahkan class "checked"
            if (task.checked) {
                li.classList.add("checked");
            }

            // Masukkan elemen ke dalam <li>
            li.appendChild(checkbox);
            li.appendChild(taskText);
            li.appendChild(span);

            listContainer.appendChild(li);
        });
    }

    listContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-btn")) {
            e.stopPropagation(); 
    
            Swal.fire({
                title: "Apakah kamu yakin?",
                text: "Item ini akan dihapus!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Ya, hapus!",
                cancelButtonText: "Batal"
            }).then((result) => {
                if (result.isConfirmed) {
                    e.target.parentElement.remove();
                    saveData();
                    Swal.fire({
                        title: "Dihapus!",
                        text: "Item berhasil dihapus.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            });
        } 
        
        // Jika checklist diklik
        if (e.target.classList.contains("task-checkbox")) {
            e.target.parentElement.classList.toggle("checked", e.target.checked);
            saveData();
        }
    });

    // Tambahkan event listener untuk tombol tambah
    addButton.addEventListener("click", addTask);

    showTask(); // Tampilkan daftar tugas yang tersimpan saat halaman dimuat
});
