import chesspiece as piece 
import sys 

class ChessboardDriver(): 
    def __init__(self, max_col, max_row, ui_board=None):
        self.max_col = max_col 
        self.max_row = max_row 

        self.board = self.init_board() 
        self.ui_board = ui_board 
        

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
        if (self.check_for_win()): 
            winner = self.check_for_win() 
            print(str(winner) + " won! ")
            sys.exit(0)
        self.print_board() 
            
            
    def check_for_win(self): 
        for row in range(0, self.max_row): 
            for col in range(2, self.max_col-2): 
                won, winner = self.check_for_horizontal_link(row, col)
                if (won): 
                    return winner 
        for row in range(2, self.max_row-2): 
            for col in range(0, self.max_col): 
                won, winner = self.check_for_vertical_link(row, col)
                if (won):
                    return winner
        for row in range(2, self.max_row-2): 
            for col in range(2, self.max_col-2): 
                won, winner = self.check_for_corner_links_a(row, col)
                if (won): 
                    return winner
                won, winner = self.check_for_corner_links_b(row, col)
                if (won): 
                    return winner 
        return None

    
    def check_for_horizontal_link(self, origin_row, origin_col): 
        white = 0
        black = 0
        for col in range(origin_col-2, origin_col+3): 
            if (self.get_piece_by_location(origin_row, col).get_owner() == "Black"): 
                black += 1
            elif (self.get_piece_by_location(origin_row, col).get_owner() == "White"): 
                white += 1
            else: 
                pass 

        if (black == 5): 
            return True, "Black" 
        elif (white == 5): 
            return True, "White"
        else: 
            return False, None
        
    def check_for_vertical_link(self, origin_row, origin_col): 
        white = 0
        black = 0
        for row in range(origin_row-2, origin_row+3): 
            if (self.get_piece_by_location(row, origin_col).get_owner() == "Black"): 
                black += 1
            elif (self.get_piece_by_location(row, origin_col).get_owner() == "White"): 
                white += 1
            else: 
                pass 

        if (black == 5): 
            return True, "Black" 
        elif (white == 5): 
            return True, "White"
        else: 
            return False, None
        
    """
    Checks for 
    -2, -2 
        -1, -1 
            0, 0 
                +1, +1
                    +2, +2
    links
    """
    def check_for_corner_links_a(self, origin_row, origin_col): 
        white = 0
        black = 0
        
        for d in range(-2, 3): 
            bun = self.get_piece_by_location(origin_row+d, origin_col+d)
            if (bun.get_owner() == "Black"): 
                black += 1
            elif (bun.get_owner() == "White"): 
                white += 1
            else: 
                pass 

        if (black == 5): 
            return True, "Black" 
        elif (white == 5): 
            return True, "White"
        else: 
            return False, None
        
    """
    Checks for 
                    +2, +2
                +1, +1 
            0, 0
        -1, -1
    -2, -2 
    links
    """
    def check_for_corner_links_b(self, origin_row, origin_col): 
        white = 0
        black = 0
        
        for d in range(-2, 3): 
            bun = self.get_piece_by_location(origin_row+d, origin_col-d)
            if (bun.get_owner() == "Black"): 
                black += 1
            elif (bun.get_owner() == "White"): 
                white += 1
            else: 
                pass 

        if (black == 5): 
            return True, "Black" 
        elif (white == 5): 
            return True, "White"
        else: 
            return False, None

