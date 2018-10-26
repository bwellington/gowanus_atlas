/* eslint-disable max-len */
const interviews = [
  {
    name: 'subak',
    fullName: 'Abby Subak',
    title: 'Artist',
    videoPath: 'https://player.vimeo.com/video/231733376',
    imagePath: 'jpg/subak.jpg',
    category: 'Culture',
    description: 'Abby is an artist and the Executive Director of Arts Gowanus, a local non-profit organization working to support, promote, and advocate for local artists and a sustainable arts community. Each year the organization sponsors Gowanus Open Studios, an event held in October that showcases local artists and their work, connecting them to the greater New York City community.',
    layers: ['galleries', 'watershed'],
    quote: 'There’s a reason Gowanus has become such a hub of creativity and artists’ culture, and that’s because of the affordable spaces that are here, and it’s because of the history of industry and manufacturing that has been going on in Gowanus for a couple hundred years now.',
  },
  {
    name: 'basile',
    fullName: 'Paul Basile',
    title: 'Developer',
    videoPath: 'https://player.vimeo.com/video/231579159',
    imagePath: 'jpg/basile.jpg',
    category: 'Built Environment',
    description: 'A property manager and developer, Paul founded Gowanus Alliance in 2010 with three friends, all second and third generation businessmen in the surrounding area. Paul promotes the retention of manufacturing, industrial, creative, and entertainment businesses in the Gowanus community; seeks a new location for the Kentile sign he rescued prior to its demolition; and advocates for new community playgrounds and parks.',
    layers: ['manufacturingLandUse', 'watershed'],
    quote: 'We need more of the same. We need more space for the manufacturers to feel comfortable that they can grow into a 5 or 10 year plan.',
  },
  {
    name: 'pinkard',
    fullName: 'Tracey Pinkard',
    title: 'Gowanus Houses Art Collective',
    videoPath: 'https://player.vimeo.com/video/231577629',
    imagePath: 'jpg/pinkard.jpg',
    category: 'Social Landscape',
    description: 'While working as Parent Coordinator at the Brooklyn School of Collaborative Studies, Tracey co-founded the Gowanus Houses Art Collective, an arts youth program for the complex where she is a long time resident. She sees the program as a bridge to the creative community in the surrounding wealthier neighborhoods, offering them a window into life in the public housing complex.',
    layers: ['youth', 'nycha', 'watershed'], // nycha, gowanus houses
    quote: 'For many years the canal reeked, the smell was just horrible, and in the summer it permeated, it was just sickening. And so now there’s this Superfund, and there’s this big concern about the cleanup.',
  },
  {
    name: 'uz',
    fullName: 'Michelle de la Uz',
    title: 'Fifth Avenue Committee',
    videoPath: 'https://player.vimeo.com/video/231577261',
    imagePath: 'jpg/uz.jpg',
    category: 'Social Landscape',
    description: 'Michelle is the Executive Director of the Fifth Avenue Committee, a non-profit community organization in Brooklyn that develops and manages affordable housing and community facilities, creates economic opportunities and ensures access to economic stability, organizes residents and workers, offers student-centered adult education, and combats displacement caused by gentrification. She also serves on the New York City Planning Commission.',
    layers: ['assessedValue', 'nycha', 'watershed'], // nycha, gowanus houses
    quote: 'I think that the cleanup processes that are underway and the rezoning that will be formally launched have the ability to try to right some wrongs that have existed historically, but I think that only happens if we are conscious about righting those wrongs.',
  },
  {
    name: 'valle',
    fullName: 'Jared Della Valle',
    title: 'Alloy Development',
    videoPath: 'https://player.vimeo.com/video/275931249',
    imagePath: 'jpg/valle.jpg',
    category: 'Built Environment',
    description: 'Jared has been a real estate professional and architect for more than 20 years and has managed the acquisition and predevelopment of more than 1 million sf in New York City along the Highline, in the Hudson Yards and in DUMBO, Brooklyn.',
    layers: ['landuse', 'watershed'],
    quote: 'The community plays a fairly extraordinary role in the planning process…[the Gowanus] is the intersection of so many different aspects of our city.',
  },
  {
    name: 'scotto',
    fullName: 'Debra Scotto',
    title: 'Clemente Realty',
    videoPath: 'https://player.vimeo.com/video/275930692',
    imagePath: 'jpg/scotto.jpg',
    category: 'Built Environment',
    description: 'After attending Brooklyn Law School, Debra started her own real estate company acting as agent, property manager and developer, advocating for affordable, responsible development. She is a Brooklyn CB6 Board member and serves on its Land Use/Landmarks Committee.',
    layers: ['residential', 'watershed'],
    quote: 'Some of the challenges in this community right now probably speak to infrastructure, the lack thereof, and lack of affordable housing.',
  },
  {
    name: 'wolfe',
    fullName: 'Sue Wolfe',
    title: 'Friends of Thomas Green Park',
    videoPath: 'https://player.vimeo.com/video/275932414',
    imagePath: 'jpg/wolfe.jpg',
    category: 'Culture',
    description: 'Sue Wolfe has called Brownstone Brooklyn "home" since the 1960\'s, first owning a brownstone in Fort Greene, then moving to a house in Boerum Hill, purchasing a house with their daughter in Red Hook and most recently buying a coop in Fort Greene. She is the President of Friends of Thomas Green Park, a non-profit advocating for the preservation of public park space in the Gowanus community.',
    layers: ['parks', 'watershed'],
    quote: 'The community needs more parks, more green space – we don’t see that happening.',
  },
  {
    name: 'nimmons',
    fullName: 'Charlene Nimmons',
    title: 'Public Housing Communities',
    videoPath: 'https://player.vimeo.com/video/275930618',
    imagePath: 'jpg/nimmons.jpg',
    category: 'Social Landscape',
    description: 'Charlene is a NYCHA resident and founder of Public Housing Communities, a group that promotes economic development in the community.',
    layers: ['demographics', 'nycha', 'watershed'],
    quote: 'I think more so we’re afraid of each other because of the unknown, and so if we come together and learn of who we each are I think that we would have a more productive community.',
  },
  {
    name: 'parker',
    fullName: 'Andrea Parker',
    title: 'Gowanus Canal Conservancy',
    videoPath: 'https://player.vimeo.com/video/275930436',
    imagePath: 'jpg/parker.jpg',
    category: 'Environment',
    description: 'With a degree from the University of Virginia and a background in Landscape Design, Andrea joined the Conservancy as a board member/volunteer in 2013. She was hired as the organization’s second Executive Director in 2014 and has been an adjunct professor at City College since 2015.',
    layers: ['parks', 'cso', 'watershed'],
    quote: 'It’s an extremely productive ecology – the canal and the manufacturing gas plants along it powered most of Brooklyn and built this town.',
  },
  {
    name: 'schoneveld',
    fullName: 'Rebecca Schoneveld',
    title: 'Schone Bridal',
    videoPath: 'https://player.vimeo.com/video/290071617',
    imagePath: 'jpg/schoneveld.jpg',
    category: 'Built Environment',
    description: 'Rebecca opened her shop on Third Avenue in 2013, with a beautiful and cheerful boutique space in the front and a full sewing production and design studio in the back where visitors can see firsthand the process that goes into creating original, locally handcrafted gowns.',
    layers: ['commercial', 'watershed'],
    quote: 'We can have a really creative, flourishing community that embraces all the cultures that have been here for generations.',
  },
  {
    name: 'luna',
    fullName: 'Rafael Gomez Luna',
    title: 'Community Activist',
    videoPath: 'https://player.vimeo.com/video/290071654',
    imagePath: 'jpg/gomez.jpg',
    category: 'Culture',
    description: 'Rafael was born in Santo Domingo, Dominican Republic and moved to NYC when he was 18. As a child he witnessed the Dominican civil war and the end of the Trujillo regime. He has worked as a model, an actor, and as a community and housing activist in Washington Heights, the Lower East Side, and in Brooklyn. He is married with a young daughter, and lives and works in Gowanus.',
    layers: ['school', 'galleries', 'watershed'],
    quote: 'What our community needs most is for us as residents, organizations, developers, activists, elected officials to come together and try to preserve what we already have while at the same time help progress come our way.',
  },
  {
    name: 'reich',
    fullName: 'Peter Reich',
    title: '288 Nevins Street Tenants Association',
    videoPath: 'https://player.vimeo.com/video/275932122',
    imagePath: 'jpg/reich.jpg',
    category: 'Infrastructure',
    description: 'Peter is an industrial designer and one of the founders of the original Swift Folder bicycle. His fabrication shop is located at 543 Union Street and he lives directly adjacent to the proposed staging area for the 8 million gallon retention tank facility at the north end of the canal.',
    //  Art Galleries, Manufacturing Businesses, Bicycle Paths
    layers: ['manufacturingLandUse', 'bike', 'galleries', 'watershed'],
    quote: 'My vision of the canal is to, as much as possible, maintain the charming post-industrial wasteland aura that makes it so attractive.',
  },
  {
    name: 'tyre',
    fullName: 'Ed Tyre',
    title: 'Gowanus Tenants Association',
    category: 'Social Landscape',
    description: 'Ed is an advocate for expanding the conversation about resiliency and sustainability in the Gowanus to include the resiliency and sustainability of the community’s people. As a community leader he calls on the city to recognize that environmental impacts are not shared equally in the area and prioritize addressing those burdens that disproportionately destroy the health and safety of low-income residents and people of color.',
    quote: 'My vision for the future of Gowanus…is the people to get their just due and for, you know the people that live here to understand their value. We have to give people a way of expressing themselves.',
    layers: ['youth', 'senior', 'watershed'],
    videoPath: 'https://player.vimeo.com/video/276641721',
    imagePath: 'jpg/tyre.jpg',
  },
  {
    fullName: 'Michael Higgins',
    name: 'higgins',
    title: 'Families United for Racial and Economic Equality (FUREE) ',
    category: 'Social Landscape',
    description: 'Michael is a member turned organizer at FUREE. He first came to the organization through its Youth Program and is a native of the Fort Greene area of Brooklyn. He joined the Accountable Development campaign, before engaging more deeply in work around public housing. He now does organizing with FUREE members around environmental justice, civic participation and further inclusion of public housing in the greater housing justice movement in New York City.',
    quote: 'The wealthier community that lives in the Gowanus, the people who live in brownstones, could much better understand how the distribution of public services leans towards them and how their opinions and their voice…affects how their neighbors in public housing live at a very fundamental level.',
    // Affordable Housing (all three NYCHA projects), Assessed Land Value, Diversity
    layers: ['assessedValue', 'watershed'],
    videoPath: 'https://player.vimeo.com/video/275931624',
    imagePath: 'jpg/higgins.jpg',
  },
  {
    name: 'hesselein',
    fullName: 'Hans Hesselein',
    title: 'Landscape Architect',
    category: 'Infrastructure',
    description: 'While the Gowanus Canal Conservancy’s first Executive Director, Hans developed and managed green infrastructure projects, watershed planning initiatives and volunteer stewardship programs. Hans is the founder of Apiary Studio and an adjunct professor at Philadelphia University, where he teaches two courses on the history of Landscape Architecture.',
    quote: 'The canal needs more open green space; it needs softer, more permeable surfaces; it needs more wildlife habitat, more plant communities, and it also needs a lot of work done to the watershed in order to allow storm water to infiltrate and reduce the amount of sewage that gets dumped into the canal.',
    layers: ['parks', 'watershed'],
    videoPath: 'https://player.vimeo.com/video/275931153',
    imagePath: 'jpg/hesselein.jpg',
  },
  {
    name: 'martin',
    fullName: 'Zac Martin',
    title: 'Pastor and Community Activist',
    category: 'Social Landscape',
    description: 'Zac is the executive director of Trellis, an organization fitting churches with non-profits to build stronger communities together. He is also the pastor of community outreach at Trinity Grace Park Slope.',
    quote: 'People without money often think they have nothing to offer to the community, but their simple history in being involved through many generations…what it means to grow up in this neighborhood is invaluable as new people come into the neighborhood.',
    layers: ['demographics', 'nycha', 'watershed'],
    videoPath: 'https://player.vimeo.com/video/275932578',
    imagePath: 'jpg/martin.jpg',
  },
  {
    name: 'kleinman',
    fullName: 'Louis Kleinman',
    title: 'Waterfront Alliance',
    category: 'Hydrology',
    description: 'Louis sits on the Gowanus Canal Community Advisory Group as the community liaison for the Waterfront Alliance, a non-profit advocating for resiliency, ecology, and access to the water’s edge throughout the five boroughs. A strong advocate for environmental justice and the underserved, he also finds time to volunteer with other nonprofit organizations.',
    quote: 'The Gowanus community is facing the challenges that are very usual to all of the five boroughs in neighborhoods of lower economic means.',
    layers: ['fema', 'watershed'],
    videoPath: 'https://player.vimeo.com/video/275931504',
    imagePath: 'jpg/kleinman.jpg',
  },
  {
    name: 'giumenta',
    fullName: 'Anthony Giumenta',
    title: 'Architectural Grille',
    category: 'Built Environment',
    description: 'Anthony is the President and Founder of Architectural Grille located on Second Avenue. He was born and raised in the Dyker Heights and began his career working alongside his mentor and father Federico Giumenta and his two brothers Michael and Fred. After earning his degree in Architectural & Mechanical Design, Anthony formed Architectural Grille. His sons Anthony Jr. and Stephen are Vice Presidents of the company. ',
    quote: 'Sandy really hurt us very bad, very bad. You know, I come in that Monday morning and I didn’t believe my eyes. It was a complete disaster.',
    // Layers: Manufacturing Businesses, Flood Zones
    layers: ['manufacturingLandUse', 'sandy', 'watershed'],
    videoPath: 'https://player.vimeo.com/video/275930518',
    imagePath: 'jpg/giumenta.jpg',
  },
  {
    name: 'dixon',
    fullName: 'Sean Dixon',
    title: 'Riverkeeper',
    category: 'Hydrology',
    description: 'Currently the Senior Policy Advisor to the EPA Regional Administrator in Boston, Sean is the former staff attorney at Riverkeeper, a non-profit founded by Robert Kennedy Jr. that advocates for a clean NYC watershed and a restored Hudson River.',
    quote: 'As a river advocate my vision for the future of the Gowanus Canal is to have fishable, swimmable canal; a waterway that under the Clean Water Act has no pollution coming into it.',
    // Combined Sewer Overflows, Flood Zones
    layers: ['cso', 'fema', 'watershed'],
    videoPath: 'https://player.vimeo.com/video/275932294',
    imagePath: 'jpg/dixon.jpg',
  },
  {
    name: 'franklin',
    fullName: 'Nigel Franklin',
    title: 'Workforce Development Specialist',
    category: 'Social Landscape',
    description: 'As part of the Resilient Networks initiative, Nigel is working at the Fifth Avenue Committee to set up a Gowanus network that will be positioned strategically for economic and workforce development. The FAC wants to ensure that following the community’s experience during Sandy, the organization can support the community in future disasters.',
    quote: 'What our community needs most is structured, sincere, and very motivated representation.',
    // Diversity, Projected Sea Level Rise, Senior Citizens
    layers: ['slr', 'demographics', 'watershed'],
    videoPath: 'https://player.vimeo.com/video/275931967',
    imagePath: 'jpg/franklin.jpg',
  },
    // all nycha, Diversity, Flood Zones
  {
    name: 'blondel',
    fullName: 'Karen Blondel',
    title: 'Environmental Justice Organizer',
    category: 'Social Landscape',
    description: 'As public and private money flowed in after Hurricane Sandy, Karen and other local organizers launched an initiative called “Turning the Tide” to make sure that low-income public housing residents have a say in how that money is spent. A collaboration of several community organizations, its goal is to amplify the voices of low-income South Brooklyn public housing residents in implementation and policy decisions about environmental cleanup and climate adaptation.',
    quote: 'Environmental justice says that collectively we should be at the table. There’s a difference between equality and equity, and the equity is what’s missing in the equation.',
    // Affordable Housing (all three NYCHA projects), Diversity, Flood Zones
    layers: ['demographics', 'fema', 'watershed'],
    videoPath: 'https://player.vimeo.com/video/275931345',
    imagePath: 'jpg/blondel.jpg',
  },
  {
    name: 'mcclure',
    fullName: 'Eric McClure',
    title: 'Park Slope Neighbors',
    category: 'Infrastructure',
    description: 'An advocate for the responsible design and construction of safe streets, bike paths, and sidewalks, Eric is a campaign coordinator of Park Slope Neighbors, a neighborhood organization committed to the protection and enhancement of the quality life in Park Slope. He also serves as Chair of the Brooklyn CB 6 Transportation Committee.',
    quote: 'It’s unclear at this point whether the resources to support all this new population are really here - whether the schools can accommodate it, the transportation system can accommodate it, so I think there are a lot of challenges facing Gowanus. But at the heart of it is an opportunity with the Superfund cleanup to really make the community better.',
    // Bicycle Paths, Mass Transit, Pedestrian Walkways, Roads, Superfund Cleanup
    layers: ['cleanup', 'subway', 'watershed'],
    videoPath: 'https://player.vimeo.com/video/275930878',
    imagePath: 'jpg/mcclure.jpg',
  },
  {
    name: 'diegel',
    fullName: 'Eymund Diegel',
    title: 'Environmental and Urban Planner',
    category: 'Hydrology',
    description: 'Eymund is an Urban Planner specialized in the mapping and analysis of changing urban, rural, and natural habitat systems. His expertise includes environmental and transportation planning, infrastructure network mapping, siting studies for new industrial facilities, polluted site cleanups, wetlands and ecosystem remediation, rapid urbanization management, and sustainable metropolitan structure planning.',
    quote: 'One of the biggest challenges is change and the tensions that come from that change as different groups compete. Some want to stay and leave things the way they are, they know that they will be pushed out by people with more money. Other people have been here for a long time, they’ve invested in the community, they want change so that their children will want to stay here and not get the hell out.',
    // Equity, Land Use, Projected Sea Level Rise, Historical Wetlands and Streams,
    // Gowanus Canal Watershed, Superfund Cleanup, Coal Tar Contamination
    layers: ['demographics', 'cleanup', 'watershed'],
    videoPath: 'https://player.vimeo.com/video/275931052',
    imagePath: 'jpg/diegel.jpg',
  },
];

export default interviews;
/* eslint-enable max-len */
