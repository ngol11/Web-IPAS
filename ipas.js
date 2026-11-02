
const kunciJawaban = {
  1: "b",
  2: "b",
  3: "b",
  4: "b",
  5: "b"
};

// Menyimpan jawaban user
let jawabanUser = {};


document.querySelectorAll(".opsi").forEach(function (opsi) {
  opsi.addEventListener("click", function () {
    const quizBox = this.closest(".quiz-box");
    const nomor = quizBox.getAttribute("data-nomor");
    const jawaban = this.getAttribute("data-jawaban");

   
    quizBox.querySelectorAll(".opsi").forEach(function (item) {
      item.classList.remove("benar", "salah", "dipilih");
    });

   
    this.classList.add("dipilih");
    jawabanUser[nomor] = jawaban;

   
    if (jawaban === kunciJawaban[nomor]) {
      this.classList.add("benar");
    } else {
      this.classList.add("salah");

      
      quizBox.querySelectorAll(".opsi").forEach(function (item) {
        if (item.getAttribute("data-jawaban") === kunciJawaban[nomor]) {
          item.classList.add("benar");
        }
      });
    }
  });
});


document.getElementById("btn-skor").addEventListener("click", function () {
  let benar = 0;
  const total = Object.keys(kunciJawaban).length;

  for (let nomor in kunciJawaban) {
    if (jawabanUser[nomor] === kunciJawaban[nomor]) {
      benar++;
    }
  }

  const persen = Math.round((benar / total) * 100);
  let pesan = "";

  if (persen === 100) {
    pesan = "Sempurna! Kamu sudah menguasai materinya.";
  } else if (persen >= 80) {
    pesan = "Bagus sekali! Pemahamanmu sudah sangat baik.";
  } else if (persen >= 60) {
    pesan = "Lumayan bagus. Coba pelajari lagi bagian yang masih ragu.";
  } else {
    pesan = "Yuk pelajari lagi materi di atas, lalu coba ulang kuisnya!";
  }

  const hasilDiv = document.getElementById("hasil");
  hasilDiv.innerHTML = `Skor kamu: <span style="color:#e63946">${benar}/${total}</span> (${persen}%)<br>${pesan}`;
  hasilDiv.classList.add("tampil");

 
  hasilDiv.scrollIntoView({ behavior: "smooth", block: "center" });
});


document.querySelectorAll('nav a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});