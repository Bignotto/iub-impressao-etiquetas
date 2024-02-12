-- declare @OP int

-- set @OP = @input_parameter

select
	FORMAT(GETDATE(), 'dd/mm/yyyy') [Data1],
	CONCAT(T0.U_UPItmCod,FORMAT(GETDATE(), 'ddmmyyyyhhmmss')) [NumSerie],
	'401' [LM],
	SUBSTRING(T1.U_UPCodIAn,1,3) [Ref],
	SUBSTRING(T1.U_UPCodIAn,5,2) [Tam],
	SUBSTRING(T1.U_UPCodIAn,7,2) [Cor],
	SUBSTRING(T1.U_UPCodIAn,9,2) [Forro],
	SUBSTRING(T1.U_UPCodIAn,11,2) [Adn],
	SUBSTRING(T1.U_UPCodIAn,13,2) [Alc],
	'(19)3500-2011' [Telefone],
	'@urnasbignotto' [Cidade],
	T1.U_UPCodIAn [CodBig],
	T1.ItemName [Descricao],
	T0.DocEntry [OP],
	T0.U_UPQtdPla [Quantidade]

from [dbo].[@UPR_OWOR] T0
	inner join [dbo].[OITM] T1 on T1.ItemCode = T0.U_UPItmCod

where T0.DocEntry in (@input_parameter)