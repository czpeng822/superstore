import React from 'react';

function TitledSection() {
  const sections = [
    {
      title: 'About Us',
      subsections: [
        { title: 'Careers', url: '/subsection1.1' },
        { title: 'Newsletter', url: '/subsection1.3' },
        { title: 'Accessibility', url: '/subsection1.4' },
        { title: 'Sustainability', url: '/subsection1.5' },
        { title: 'Press Center', url: '/subsection1.6' },
        { title: 'Investor Relations', url: '/subsection1.7'},
        { title: 'About OnMart Superstore', url: '/subsection1.8'}
      ]
    },
    {
      title: 'Help You',
      subsections: [
        { title: 'Your Account', url: '/subsection2.1' },
        { title: 'Your Orders', url: '/subsection2.2' },
        { title: 'Shipping Rates & Policies', url: '/subsection2.3' },
        { title: 'Returns & Replacements', url: '/subsection2.4' },
        { title: 'Recalls and Product Safety Alerts', url: '/subsection2.5' },
        { title: 'Help', url: '/subsection2.6' },
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center',backgroundColor:'#1976D2',height:'250px'}}>
      {sections.map((section, index) => (
        <div key={index} className="section" style={{ margin: '0 40px', textAlign: 'center' }}>
          <div className="section-title" style={{ marginTop: '50px',fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>{section.title}</div>
          <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {section.subsections.map((subsection, subIndex) => (
              <div key={subIndex}>
                <div className="subheading">
                  <a href={subsection.url} style={{ fontSize: '13px', fontWeight: 'bold', color: 'black', textDecoration: 'none' }}>{subsection.title}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
    
    export default TitledSection;