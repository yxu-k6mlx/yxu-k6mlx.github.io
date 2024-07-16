class ChesspieceDriver():
    def __init__(self, x, y, board=None, owner=None): 
        self.owner = owner
        self.__x = x 
        self.__y = y

    def get_owner(self): 
        return self.owner 
    
    def get_x(self): 
        return self.__x
    
    def get_y(self): 
        return self.__y 
    
    def get_location(self): 
        return (self.__x, self.__y) 
    
    def set_owner(self, owner=None): 
        self.owner = owner 
        return 
    
    def set_x(self, x): 
        self.__x = x 
        return 
    
    def set_y(self, y): 
        self.__y = y 
        return 

    def set_location(self, x, y): 
        self.__x = x 
        self.__y = y 
        return 