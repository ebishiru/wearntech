import styled from "styled-components";

const AboutPage = () => {
    return (
        <>
        <DescriptionSection>
            <h2>Meet the Team Behind this Project</h2>
            <p>Hey there,</p>
            <p>
            We are five web developers in training at Concordia University, coming together to build this website in just one week. It was our first experience working in a large team, and while it came with challenges, we learned so much along the way. Each of us brings a unique style and perspective to web development, and we’re excited to share our work with you.
            </p>
            <p>Check out our individual portfolios to see more of our skills in action.</p>
        </DescriptionSection>
        
        <PortfolioSection>
            <PortfolioItem
                href="https://az1v.github.io/my-portfolio/"
                src="/assets/aziz-picture.jpg"
                alt="Aziz Moe"
            />
            <PortfolioItem
                href="https://ebishiru.github.io/my-portfolio/"
                src="/assets/kevin-picture.jpg"
                alt="Kevin Kar-Ho Lo"
            />
            <PortfolioItem
                href="https://mahannilipour.github.io/My-portfolio/"
                src="/assets/Mahan-picture.jpg"
                alt="Mahan Nilipour"
            />
            <PortfolioItem
                href="https://nhathivuongportfolio.vercel.app/"
                src="/assets/nhathi-picture.JPG"
                alt="Nha Thi Vuong"
            />
            <PortfolioItem
                href="https://valoopay.github.io/my-portfolio/"
                src="/assets/valerie-picture.jpg"
                alt="Valerie Payeur"
            />
        </PortfolioSection>
        <FooterSection>
            <p>Thank you for your support—we can’t wait to show you what we can do next!</p>
        </FooterSection>
        </>
        
    )
}

export default AboutPage;

const DescriptionSection = styled.section`
    width: 55ch;
    margin: 3rem auto 1rem;
    text-align: center;

    && p {
        margin: 1rem;
        line-height: 1.6;
    }
`
const PortfolioSection = styled.section`
    display: flex;
    justify-content: center;
    margin: 5rem;
    gap: 1rem;
`

const StyledLink = styled.a`
    text-decoration: none;
`

const StyledImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 2px solid var(--color-black);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
`
const PortfolioItem = ({ href, src, alt}) => {
    return (
        <StyledLink href={href} target="_blank">
            <StyledImage src={src} alt={alt} />
        </StyledLink>
    )
}

const FooterSection = styled.section`
    margin: 1rem auto;
    text-align: center;
    font-weight: bold;
`