import { useState, useEffect } from "react";

const useFetch = (url, options = {}, cacheKey = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // إذا كانت البيانات موجودة في الـ cache، استخدمها مباشرة
    if (cacheKey && localStorage.getItem(cacheKey)) {
      setData(JSON.parse(localStorage.getItem(cacheKey)));
      setLoading(false);
      return;
    }

    // إنشاء AbortController لإلغاء الطلب إذا لزم الأمر
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // إعادة تعيين الخطأ عند بدء عملية جديدة
        const response = await fetch(url, { ...options, signal });
        
        // التعامل مع الأخطاء في حالة وجود استجابة غير ناجحة
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        
        // إذا كان هناك مفتاح كـ cacheKey، خزّن البيانات في الذاكرة المؤقتة
        if (cacheKey) {
          localStorage.setItem(cacheKey, JSON.stringify(result));
        }

        setData(result); // تحديث الـ state مع البيانات
      } catch (err) {
        // في حالة الإلغاء أو حدوث خطأ آخر
        if (err.name === "AbortError") {
          console.log("Request aborted");
        } else {
          setError(err.message); // حفظ الرسالة الخاصة بالخطأ
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // إلغاء الطلب في حالة إزالة المكون أو إذا تم تغيير الرابط أو الخيارات
    return () => controller.abort();

  }, [url, options, cacheKey]); // إعادة تشغيل التأثير إذا تغير الرابط أو الخيارات أو مفتاح الـ cache

  return { data, loading, error };
};

export default useFetch;
