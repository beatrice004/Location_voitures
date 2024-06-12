/-- if car is inserted in rentals table : set 0 to available in cars table
DELIMITER //

CREATE TRIGGER update_car_available AFTER INSERT ON rentals
FOR EACH ROW
BEGIN
    UPDATE cars
    SET available = 0
    WHERE id = NEW.car_id;
END//

DELIMITER ;
/-----------
/-- if car is deleted from rentals table : set 1 to available in cars table
DELIMITER //

CREATE TRIGGER update_car_available_yes AFTER DELETE ON rentals
FOR EACH ROW
BEGIN
    UPDATE cars
    SET available = 1
    WHERE id = OLD.car_id;
END//

DELIMITER ;