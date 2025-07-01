package com.giktek.kyc_service.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Chat {
    @Id
    private String id;
}
