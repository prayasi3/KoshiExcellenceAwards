// src/pages/Categories.jsx

import PageBanner from "../components/layout/PageBanner";
import Section from "../components/layout/Section";
import Container from "../components/layout/Container";
import SectionHeading from "../components/layout/SectionHeading";
import CategoryGrid from "../components/categories/CategoryGrid";

export default function Categories() {
  return (
    <>
      <PageBanner
        title="Award Categories"
        subtitle="Explore the categories that celebrate excellence and recognize individuals whose achievements have made a lasting impact across Koshi Province."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Categories" },
        ]}
      />

      <Section background="white">
        <Container>
          <SectionHeading
            eyebrow="Recognition"
            title="Explore Our Award Categories"
            description="Each category honors exceptional contributions in different fields. Discover the individuals who have inspired communities through dedication, leadership, innovation, and service."
            align="center"
          />

          <CategoryGrid />
        </Container>
      </Section>
    </>
  );
}