import type { JSX } from "react";

export const metadata = {
  title: "დახმარება და შეკითხვები – ონლაინ მაღაზია",
  description:
    "კითხვები მიწოდებაზე, დაბრუნებაზე და დემო შეკვეთებზე. გაიგე როგორ მუშაობს ეს საცდელი ონლაინ მაღაზია.",
};

export default function HelpPage(): JSX.Element {
  return (
    <div className="mx-auto max-w-3xl space-y-6 py-4">
      <header className="space-y-2">
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          დახმარება და ხშირად დასმული კითხვები
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          ეს არის დემო ecommerce პროექტი — გადახდები და რეალური მიწოდება არ
          სრულდება. გვერდი დაგეხმარება სცენარების ტესტირებასა და დემონსტრაციაში.
        </p>
      </header>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          როგორ მუშაობს კალათა და შეკვეთა?
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-xs text-slate-600 dark:text-slate-300">
          <li>პროდუქტები ემატება კალათაში ღილაკით „კალათაში დამატება“.</li>
          <li>კალათიდან შეგიძლია შეცვალო რაოდენობა ან წაშალო პროდუქტი.</li>
          <li>
            შეკვეთის ფორმა არის სრულად დემო — შეყვანილი ინფორმაცია არ
            ინახება/არ იგზავნება სერვერზე.
          </li>
        </ul>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          რას შეიძლება გამოვიყენო ეს პროექტი?
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-xs text-slate-600 dark:text-slate-300">
          <li>UI/UX პროტოტიპის საჩვენებლად კლიენტებთან.</li>
          <li>Next.js App Router / React 19 ecommerce სტრუქტურის მაგალითისთვის.</li>
          <li>ფილტრაციის, დალაგებისა და pagination-ის დემონსტრირებისთვის.</li>
        </ul>
      </section>
    </div>
  );
}


