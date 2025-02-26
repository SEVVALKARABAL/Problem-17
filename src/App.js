import { document } from "postcss";
import { useState, useEffect } from "react";

// Bu bileşen sayaç uygulamasıdır. Kullanıcı her tıklamada sayıyı artırır ve bu sayı sekmenin başlığında (document.title) gösterilir.
// Görevler:
// 1. useEffect hook'u kullanarak, sayaç değeri her değiştiğinde sekmenin başlığını (document.title) "Tıklama Sayısı: X" şeklinde güncelleyin.
// 2. Bileşen her render edildiğinde konsola "Rendering" yazılmaya devam etsin. Ancak yalnızca sayacın değiştiği durumlarda "Rendering Sonrası" mesajını görün.
// 3. Kullanıcı "count" değerini sıfırlamak için sıfırlama butonu ekleyin (örn. "Sıfırla" butonu).
// 4. Sekmenin başlığı ilk render sırasında varsayılan değer almalı (örn. "Sayaç Uygulaması").

// Bonus:
// - Sekme başlığına, tıklama sayısına göre bir emoji ekleyin (örn. 0-10 için 😊, 11-20 için 😎, 20+ için 🎉).
// - Kullanıcı sayacı artırırken animasyonlu bir artış efekti ekleyin (örneğin, sayının kısa süreyle büyümesi ve eski boyutuna dönmesi).
// - Sayaç belirli bir değere ulaştığında (örn. 50), bir uyarı gösterin (örn. "50'ye ulaştınız") ve butonu devre dışı bırakın.

// Tailwind ile ilgili istekler:
// 1. Sayacın olduğu alan için daha belirgin bir tasarım ekleyin (örneğin, renkli bir border veya gölge).
// 2. "Tıklama Sayısı" metninin rengini sayaç değeri arttıkça dinamik olarak değiştirin (örn. 0-10 için yeşil, 11-20 için sarı, 20+ için kırmızı).
// 3. Tıklama butonuna hover sırasında farklı bir animasyon ekleyin (örneğin, butonun büyümesi veya arka plan renginin dalgalanması).
// 4. Ekran boyutuna göre yazı boyutlarını ve buton boyutlarını optimize edin (mobil cihazlar için daha küçük, geniş ekranlar için daha büyük boyutlar).
// 5. Sıfırlama butonunu, mevcut sayaca göre farklı bir renk tonuyla vurgulayın (örn. tıklama sayısı sıfır değilse buton daha belirgin olsun).

export default function Counter() {
  const [count, setCount] = useState(0);
  function getEmoji(count) {
    if (count > 20) return "🎉";
    if (count > 10) return "😎";
    return "😊";
  }
  useEffect(() => {
    document.title =
      count === 0
        ? "Sayaç Uygulaması"
        : `Tıklama Sayısı: ${count} ${getEmoji(count)}`;
    console.log("Rendering Sonrası");
    if (count === 50) {
      alert("50'ye ulaştınız!");
    }
  }, [count]);

  function updateCount() {
    if (count < 50) {
      setCount((c) => c + 1);
    }
  }

  function refreshCount() {
    setCount(0);
  }

  console.log("Rendering");

  return (
    <div className="bg-blue-500/50 h-screen grid place-items-center">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg border-4 border-gray-300">
        <h1
          className={`text-4xl font-bold tracking-tight pb-6 ${
            count > 20
              ? "text-red-500"
              : count > 10
              ? "text-yellow-500"
              : "text-green-500"
          }`}
        >
          {count} kez tıkladınız
        </h1>
        <button
          className="rounded-md bg-indigo-600 px-4 py-2 text-lg font-semibold text-white shadow-md hover:bg-indigo-500 hover:scale-110 transition-transform duration-200 mr-4 disabled:bg-gray-400"
          onClick={updateCount}
          disabled={count > 51}
        >
          +1
        </button>
        <button
          className={`rounded-md px-4 py-2 text-lg font-semibold shadow-md transition-colors duration-200 ${
            count > 0
              ? "bg-red-600 text-white hover:bg-red-500"
              : "bg-gray-400 text-gray-200"
          }`}
          onClick={refreshCount}
        >
          Sıfırla
        </button>
      </div>
    </div>
  );
}
