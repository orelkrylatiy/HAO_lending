export default function HowItWorks() {
  return (
    <section id="how-it-works" className="hidden bg-[#fcfbf7] py-16">
      <div className="container-main">
        <h2 className="text-3xl font-bold text-[#121212] mb-8 text-center">Как проходят занятия</h2>
        <ol className="flex flex-col gap-4 max-w-xl mx-auto">
          <li className="flex gap-3">
            <span className="font-bold text-[#F86704]">1.</span>
            <span className="text-[#3d2b1f]">Подбираете с преподавателем удобное вам время уроков</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-[#F86704]">2.</span>
            <span className="text-[#3d2b1f]">Подключаетесь к интерактивной платформе с любого устройства и в любом месте</span>
          </li>
        </ol>
      </div>
    </section>
  );
}
