import React from 'react';

const Faq = () => {
  const faqs = [
    {
      question: "What's the difference between a blog post & an article?",
      answer:
        "Blog posts used to be short and opinion-based, while articles were longer and research-heavy. Today, many blogs publish long-form content similar to articles. The label matters less than delivering valuable content.",
    },
    {
      question: "How long should a blog post be for SEO?",
      answer:
        "There’s no fixed length, but blog posts are often 1200+ words now. In-depth resources over 3,000 words are common and perform well if they match search intent.",
    },
    {
      question: "What are the benefits of blogging for businesses?",
      answer:
        "Blogging helps businesses generate leads, improve search visibility, and build authority. It’s a key part of inbound marketing and helps drive long-term traffic.",
    },
    {
      question: "What is a good format for writing a blog post?",
      answer:
        "Start with a compelling title and introduction. Use subheadings, short paragraphs, bullet points, and a strong conclusion. This improves readability and SEO.",
    },
    {
      question: "How often should I publish blog posts?",
      answer:
        "Consistency matters more than frequency. Weekly or biweekly posting works well for most. The key is to maintain quality and stick to a realistic schedule.",
    },
    {
      question: "Should I include images in my blog posts?",
      answer:
        "Yes, images improve engagement, break up text, and help explain complex ideas. Use high-quality visuals and include alt text for SEO.",
    },
    {
      question: "What are SEO blog posts?",
      answer:
        "SEO blog posts are written with keywords and search intent in mind. They aim to rank well on search engines and drive targeted traffic to your site.",
    },
    {
      question: "Can I repurpose blog posts into other content?",
      answer:
        "Absolutely. You can turn blog posts into social media posts, videos, newsletters, or even ebooks. Repurposing extends your content’s value.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Blog FAQs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
