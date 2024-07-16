import chesspiece as piece 

class ChessboardDriver(): 
    def __init__(self, max_col, max_row, ui_board=None):
        self.max_col = max_col 
        self.max_row = max_row 

        self.board = self.init_board() 

        self.ui_board = ui_board 
        self.is_won = False 
        self.winner = None
        

    """
        Initiates the chessboard by placing invisible pieces on the slots
    """
    def init_board(self): 
        id = 0 # for debugging
        board = [None]*self.max_row
        for row in range(self.max_row): 
            board[row] = [None]*self.max_col # make the board first
        
        for row in range(self.max_row): 
            for col in range(self.max_col): 
                board[row][col] = piece.ChesspieceDriver(id=id, owner=None)
                id += 1
        return board

    def get_piece_by_location(self, row, col): 
        return self.board[row][col]
    
    """
        Survey the whole board, and prints out a formatted board to console 
        X = Black, O = White, ? = No owner
    """
    def print_board(self): 
        print("Here is your chessboard: \n")

        for row in range(self.max_row): 
            row_str = ""
            for col in range(self.max_col): 
                bun = self.get_piece_by_location(row, col) # cuz go pieces look like steamed buns to me 
                row_str += self.get_owner_symbol(bun) 
            print(row_str)
                
    def get_owner_symbol(self, bun): 
        if (bun.get_owner() is not None): 
            if (bun.get_owner() == "Black"): 
                return " X "
            else: 
                return " O "
        else: 
            return " ? "
    
    def play(self, row, col, owner=None): 
        if self.get_piece_by_location(row, col).get_owner() is not None: 
            # A piece has already been placed at (x, y) by a player
            print("(Illegal Move by " + owner + ") play: (" + 
                  str(col) + ", " + str(row) + ") is already taken by " + 
                  self.get_piece_by_location(row, col).get_owner())
        else: 
            # This spot is available 
            self.get_piece_by_location(row, col).set_owner(owner)
            print("play: New piece placed at (" + str(col) + ", " + str(row) + ") by " + str(owner))
            
