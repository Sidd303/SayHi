import Hero from "../components/Hero"
import Content from "../components/Content"
import Navbar from "../components/Navbar"
import TextStorySection from "../components/sections/TextStorySection"

export default function Page() {
  return (
    <>
    <Navbar/>
      <Hero />
      <Content />
             <TextStorySection
        eyebrow="Clarity"
        title="No more chaos."
        description="We turn raw human feedback into clear, structured insights teams can actually use."
        align="left"
      />

      <TextStorySection
        eyebrow="Focus"
        title="One brief. One team."
        description="From research design to delivery, everything stays aligned and accountable."
        align="right"
        bg="bg-white"
      />

      <TextStorySection
        eyebrow="Scale"
        title="Built to grow with you."
        description="From early-stage startups to global enterprises, insights that scale without friction."
        align="left"
      />

      <TextStorySection
        eyebrow="Confidence"
        title="Decide with certainty."
        description="Every decision backed by real human understanding — not assumptions."
        align="right"
        bg="bg-white"
      />
    </>
  )
}
