import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../Helpers/axiosInstance";
import { isEmail } from "../Helpers/regexMatcher";
import InputBox from "../Components/InputBox/InputBox";
import TextArea from "../Components/InputBox/TextArea";
import Layout from "../Layout/Layout";
import { 
  FaTelegram, 
  FaFacebook, 
  FaYoutube, 
  FaUser,
  FaComments,
  FaGlobe,
  FaPhone,
  FaWhatsapp
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import logo from "../assets/logo.png";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("جميع الحقول مطلوبة");
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error("بريد إلكتروني غير صحيح");
      return;
    }

    setIsLoading(true);
    const loadingMessage = toast.loading("جاري إرسال الرسالة...");
    try {
      const res = await axiosInstance.post("/contact", userInput);
      toast.success(res?.data?.message, { id: loadingMessage });
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error("فشل إرسال الرسالة! حاول مرة أخرى", { id: loadingMessage });
    } finally {
      setIsLoading(false);
    }
  }

  const contactMethods = [
    { 
      name: "واتساب / اتصال", 
      icon: FaWhatsapp, 
      url: "https://wa.me/201067678296", 
      phone: "+201067678296",
      color: "hover:text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400",
      isPhone: true
    },
    { 
      name: "Telegram", 
      icon: FaTelegram, 
      url: "https://t.me/GoldenMathCenter", 
      color: "hover:text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    { 
      name: "Facebook", 
      icon: FaFacebook, 
      url: "https://www.facebook.com/share/1BHWuU7D4t/", 
      color: "hover:text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    { 
      name: "YouTube", 
      icon: FaYoutube, 
      url: "https://youtube.com/@mostafaelbazedu?si=yHJ9hvVJKSY5kNlr", 
      color: "hover:text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/20",
      iconColor: "text-red-600 dark:text-red-400"
    },
    { 
      name: "TikTok", 
      icon: FaTiktok, 
      url: "https://www.tiktok.com/@mr.mostafaelbaz?is_from_webapp=1&sender_device=pc", 
      color: "hover:text-pink-600",
      bgColor: "bg-pink-100 dark:bg-pink-900/20",
      iconColor: "text-pink-600 dark:text-pink-400"
    }
  ];

  return (
    <Layout>
      <section className="min-h-screen py-12 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              تواصل معنا
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              لديك أسئلة؟ نحب أن نسمع منك. تواصل معنا من خلال منصاتنا الاجتماعية.
            </p>
          </div>

          {/* Logo Section */}
          <div className="text-center mb-16">
            <div className="inline-block p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <img 
                src={logo} 
                alt="Golden Math Center Logo" 
                className="w-32 h-32 md:w-40 md:h-40 object-contain"
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  منصات التواصل الاجتماعي
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  تواصل معنا من خلال أي من هذه المنصات. نحن هنا لمساعدتك!
                </p>
              </div>

              {/* Contact Methods Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.url}
                    target={method.isPhone ? undefined : "_blank"}
                    rel={method.isPhone ? undefined : "noopener noreferrer"}
                    className={`group flex items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${method.color} hover:scale-105`}
                    title={method.name}
                  >
                    <div className={`flex-shrink-0 w-16 h-16 ${method.bgColor} rounded-full flex items-center justify-center mr-6`}>
                      <method.icon className={`text-2xl ${method.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {method.name}
                      </h3>
                      {method.isPhone ? (
                        <p className="text-gray-600 dark:text-gray-300">
                          {method.phone}
                        </p>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300">
                          انقر للانتقال إلى {method.name}
                        </p>
                      )}
                    </div>
                    <div className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                      {method.isPhone ? (
                        <FaPhone className="w-6 h-6" />
                      ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                لماذا تختار منصتنا؟
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUser className="text-2xl text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">دعم متخصص</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    دعم العملاء على مدار الساعة لمساعدتك في أي أسئلة
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaGlobe className="text-2xl text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">مجتمع عالمي</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    تواصل مع المتعلمين من جميع أنحاء العالم
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaComments className="text-2xl text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">استجابة سريعة</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    احصل على إجابات لأسئلتك خلال 24 ساعة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
