class ChesspieceDriver():
    def __init__(self, owner=None): 
        self.owner = owner
        
    def get_owner(self): 
        return self.owner 
    
    def set_owner(self, owner=None): 
        self.owner = owner 
        return 