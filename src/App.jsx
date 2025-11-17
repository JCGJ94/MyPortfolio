import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'

import { ContactModal } from './componentes/ContactModal'
import { Navbar } from './componentes/Navbar/Navbar'
import { Hero } from './componentes/Hero/Hero'
import { About } from './componentes/About/About'
import { Skills } from './componentes/Skills/Skills'
import { Projects } from './componentes/Projects/Projects'
import { Certs } from './componentes/Certs/Certs'

import { Footer } from './componentes/Footer/Footer'
import { certs, education, projects, social } from './data/portfolioData'
import { WaveDivider } from './componentes/WaveDivider/WaveDivider'
import { ScrollTop } from './componentes/ScrollTop/ScrollTop'
import { ContactSection } from './componentes/ContactSection/ContactSection'

export default function App() {
  return (
    <>
      <Navbar social={social} />

      <Hero social={social} />

      <Wave
      Divider from="var(--bg-main)" to="#f8f9fa" />

      <About/>

      <Skills />

      <WaveDivider from="#f8f9fa" to="var(--bg-main)" />

      <Projects projects={projects} social={social} />

      <WaveDivider from="var(--bg-main)" to="#f8f9fa" />

      <Certs certs={certs} education={education} social={social} />

      <WaveDivider from="#f8f9fa" to="var(--bg-main)" />

      <ContactSection social={social} />

      <ContactModal
        emailDestino="jcdevelopment94@gmail.com"
        whatsapp="34600658452"
      />
      <Footer />

      <ScrollTop />
    </>
  )
}
