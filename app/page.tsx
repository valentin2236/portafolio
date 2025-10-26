import { Hero3D } from "../components/Hero3D";
import { WhatIDo } from "../components/WhatIDo";
import { AboutTeaser } from "../components/AboutTeaser";
import { ProjectPreview } from "../components/ProjectPreview";
import { ContactCTA } from "../components/ContactCTA";
import { projects } from "../data/projects";

export default function Home() {
  return (
    <div className="space-y-14">
      <Hero3D />
      <WhatIDo />
      <AboutTeaser />
      <ProjectPreview projects={projects} />
      <ContactCTA />
    </div>
  );
}
