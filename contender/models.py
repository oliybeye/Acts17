from dataclasses import dataclass

@dataclass(unsafe_hash=True)
class Candidate: 
    county: str 
    districtType: str
    district: str      
    race: str            
    termType: str     
    termLength: str   
    firstName: str     
    middleName: str 
    lastName: str    
    mailingAddress: str
    email: str         
    phone: str          
    filingDate: str    
    partyPreference: str
    status: str
    electionStatus: str
    url: str
    img: str = None 
    statement: str = None
    
@dataclass
class County:
    name: str
    candidates: [Candidate]