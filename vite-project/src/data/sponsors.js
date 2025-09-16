// Sponsor data - Update with your actual sponsors
// For demo purposes, using Pexels stock photos
export const sponsors = [
  {
    id: 1,
    name: "TechCorp",
    logo: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
    website: "https://techcorp.com",
    tier: "platinum"
  },
  {
    id: 2,
    name: "InnovateX",
    logo: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
    website: "https://innovatex.com",
    tier: "gold"
  },
  {
    id: 3,
    name: "FutureTech",
    logo: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
    website: "https://futuretech.com",
    tier: "gold"
  },
  {
    id: 4,
    name: "DevStudio",
    logo: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
    website: "https://devstudio.com",
    tier: "silver"
  },
  {
    id: 5,
    name: "CloudNet",
    logo: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
    website: "https://cloudnet.com",
    tier: "silver"
  },
  {
    id: 6,
    name: "AICore",
    logo: "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
    website: "https://aicore.com",
    tier: "silver"
  },
  {
    id: 7,
    name: "ByteForce",
    logo: "https://images.pexels.com/photos/159201/circuit-circuit-board-resistor-computer-159201.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
    website: "https://byteforce.com",
    tier: "bronze"
  },
  {
    id: 8,
    name: "DataFlow",
    logo: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop",
    website: "https://dataflow.com",
    tier: "bronze"
  }
]

export const getSponsorsByTier = (tier) => {
  return sponsors.filter(sponsor => sponsor.tier === tier)
}

export const getAllSponsors = () => {
  return sponsors
}