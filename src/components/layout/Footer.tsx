export default function Footer() {
  return (
    <footer className="bg-glowy-black text-glowy-white py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-2xl font-bold text-glowy-pink">Glowy</span>
          <span className="text-glowy-gray text-sm">Beauty & Hair Care · Colombia</span>
        </div>

        <div className="flex flex-col items-center md:items-end gap-1 text-glowy-gray text-sm">
          <span>Anyeluz Cosmetics · La Poción · Milagros Cosmetics</span>
          <span>© {new Date().getFullYear()} Glowy. Todos los derechos reservados.</span>
        </div>

      </div>
    </footer>
  )
}