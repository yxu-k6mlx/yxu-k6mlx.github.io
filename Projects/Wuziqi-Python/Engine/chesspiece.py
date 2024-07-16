class ChesspieceDriver():
    def __init__(self, id, owner=None): 
        self.id = id
        self.is_knot = False # for stylizing the board
        self.owner = owner
        
    def get_owner(self): 
        return self.owner 
    
    def set_owner(self, owner=None): 
        self.owner = owner 
        return 