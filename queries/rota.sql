declare @thadeu nvarchar(10)
declare @thais nvarchar(10)
declare @thiago nvarchar(10)

declare @ROTA int

set @thadeu = 'C05304'
set @thais = 'C01683'
set @thiago = 'C05431'

set @ROTA = @input_parameter

	select
		'IUB' [BASE],
		T6.State [Estado],
		T6.Name [Cidade],
		T1.U_UPOrdCar [OrdCar],
		T3.U_UPCodIAn [CodBig],
		T0.DocEntry [NumRota],
		T1.U_UPNumPed [NUM_PED],
		T2.CardCode [Code_PN],
		T2.CardName [Nome_PN],
		case
		when isnull(T7.FreeTxt,'') = '' then T3.ItemName
		else T7.FreeTxt
	end [Desc_Item],
		T1.U_UPItmCod [COD_ITEM],
		PK.AbsEntry [NUMPKL],
		T1.U_UPQtdade [Quantidade],
		T4.NumAtCard [SubPedido],
		T7.FreeTxt

	from [dbo].[@UPP_OCRT] T0
		inner join [dbo].[@UPP_CRT1] T1 on T1.DocEntry = T0.DocEntry
		left join [dbo].[OCRD] T2 on T2.CardCode = T1.U_UPCrdCod
		left join [dbo].[OITM] T3 on T3.ItemCode = T1.U_UPItmCod
		left join [dbo].[ORDR] T4 on T4.DocEntry = T1.U_UPNumPed
		left join [dbo].[RDR1] T7 on T7.DocEntry = T4.DocEntry and T7.LineNum = T1.U_UPLinNum
		left join [dbo].[CRD1] T5 on T5.CardCode = T4.CardCode and T5.AdresType = 'B'
		left join [dbo].[OCNT] T6 on T5.County = T6.AbsId

		left join [dbo].[PKL1] PK on PK.OrderEntry = T1.U_UPNumPed and PK.OrderLine = T1.U_UPLinNum
	where T0.DocEntry = @ROTA
		and T4.CardCode not in (@thais, @thadeu)

union

	select
		'Thais' [BASE],
		T6.State [Estado],
		T6.Name [Cidade],
		T1.U_UPOrdCar [OrdCar],
		T3.U_UPCodIAn [CodBig],
		T0.DocEntry [NumRota],
		T1.U_UPNumPed [NUM_PED],
		T2.CardCode [Code_PN],
		T2.CardName [Nome_PN],
		case
		when isnull(T7.FreeTxt,'') = '' then T3.ItemName
		else T7.FreeTxt
	end [Desc_Item],
		T1.U_UPItmCod [COD_ITEM],
		PK.AbsEntry [NUMPKL],
		T1.U_UPQtdade [Quantidade],
		X0.NumAtCard [SubPedido],
		T7.FreeTxt

	from [dbo].[@UPP_OCRT] T0
		inner join [dbo].[@UPP_CRT1] T1 on T1.DocEntry = T0.DocEntry

		left join [dbo].[OITM] T3 on T3.ItemCode = T1.U_UPItmCod
		left join [dbo].[ORDR] T4 on T4.DocEntry = T1.U_UPNumPed
		left join [dbo].[RDR1] T7 on T7.DocEntry = T4.DocEntry and T7.LineNum = T1.U_UPLinNum

		inner join [SBO_ThaisBignotto].[dbo].[ORDR] X0 on X0.DocEntry = T4.NumAtCard --pedido base sub
		inner join [SBO_ThaisBignotto].[dbo].[RDR1] X1 on X1.DocEntry = T4.NumAtCard and X1.ItemCode = T1.U_UPItmCod
		left join [SBO_ThaisBignotto].[dbo].[OCRD] T2 on T2.CardCode = X0.CardCode

		left join [dbo].[CRD1] T5 on T5.CardCode = X0.CardCode and T5.AdresType = 'B'
		left join [dbo].[OCNT] T6 on T5.County = T6.AbsId

		left join [dbo].[PKL1] PK on PK.OrderEntry = T1.U_UPNumPed and PK.OrderLine = T1.U_UPLinNum
	where T0.DocEntry = @ROTA
		and T4.CardCode = @thais


union

	select
		'Thadeu' [BASE],
		T6.State [Estado],
		T6.Name [Cidade],
		T1.U_UPOrdCar [OrdCar],
		T3.U_UPCodIAn [CodBig],
		T0.DocEntry [NumRota],
		T1.U_UPNumPed [NUM_PED],
		T2.CardCode [Code_PN],
		T2.CardName [Nome_PN],
		case
		when isnull(T7.FreeTxt,'') = '' then T3.ItemName
		else T7.FreeTxt
	end [Desc_Item],
		T1.U_UPItmCod [COD_ITEM],
		PK.AbsEntry [NUMPKL],
		T1.U_UPQtdade [Quantidade],
		X0.NumAtCard [SubPedido],
		T7.FreeTxt

	from [dbo].[@UPP_OCRT] T0
		inner join [dbo].[@UPP_CRT1] T1 on T1.DocEntry = T0.DocEntry

		left join [dbo].[OITM] T3 on T3.ItemCode = T1.U_UPItmCod
		left join [dbo].[ORDR] T4 on T4.DocEntry = T1.U_UPNumPed
		left join [dbo].[RDR1] T7 on T7.DocEntry = T4.DocEntry and T7.LineNum = T1.U_UPLinNum

		inner join [SBO_ThaisBignotto].[dbo].[ORDR] X0 on X0.DocEntry = T4.NumAtCard --pedido base sub
		inner join [SBO_ThaisBignotto].[dbo].[RDR1] X1 on X1.DocEntry = T4.NumAtCard and X1.ItemCode = T1.U_UPItmCod
		left join [SBO_ThaisBignotto].[dbo].[OCRD] T2 on T2.CardCode = X0.CardCode

		left join [dbo].[CRD1] T5 on T5.CardCode = X0.CardCode and T5.AdresType = 'B'
		left join [dbo].[OCNT] T6 on T5.County = T6.AbsId

		left join [dbo].[PKL1] PK on PK.OrderEntry = T1.U_UPNumPed and PK.OrderLine = T1.U_UPLinNum
	where T0.DocEntry = @ROTA
		and T4.CardCode = @thadeu
