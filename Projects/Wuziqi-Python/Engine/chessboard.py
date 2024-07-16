import chesspiece as piece 

class ChessboardDriver(): 
    def __init__(self, max_y, max_x, ui_board=None):
        self.max_x = max_x 
        self.max_y = max_y

        self.board = self.init_board() 

        self.ui_board = ui_board 
        self.is_won = False 
        self.winner = None
        

    """
        Initiates the chessboard by placing invisible pieces on the slots
    """
    def init_board(self): 
        id = 0
        board = [None]*self.max_x
        for i in range(self.max_x): 
            board[i] = [None]*self.max_y 
        
        for i in range(self.max_x): 
            for j in range(self.max_y): 
                board[i][j] = piece.ChesspieceDriver(id=id, owner=None)
                id += 1
        return board

    def get_piece_by_location(self, x, y): 
        return self.board[x][y]
    
    """
        Survey the whole board, and prints out a formatted board to console 
        X = Black, O = White, ? = No owner
    """
    def print_board(self): 
        print("Here is your chessboard: \n")
        x = 0
        y = 0
        for x in range(self.max_x): 
            col_str = str(x) + " "
            for y in range(self.max_y): 
                # col_str += str(self.get_piece_by_location(x, y).id) + " "
                if (self.get_piece_by_location(x, y).get_owner() is not None): 
                    if (self.get_piece_by_location(x, y).get_owner() == "Black"): 
                        col_str += " X "
                    else: 
                        col_str += " O "
                else: 
                    col_str = col_str + " ? "
            print(col_str)
            y += 1
        return 
    
    def play(self, x, y, owner=None): 
        if self.get_piece_by_location(x, y).get_owner() is not None: 
            # A piece has already been placed at (x, y) by a player
            print("(Illegal Move by " + owner + ") play: (" + str(x) + ", " + str(y) + ") is already taken by " + self.get_piece_by_location(x, y).get_owner())
        else: 
            # This spot is available 
            self.get_piece_by_location(x, y).set_owner(owner)
            print("play: New piece placed at (" + str(x) + ", " + str(y) + ") by " + str(owner))
            
